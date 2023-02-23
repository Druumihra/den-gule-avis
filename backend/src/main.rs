mod types;

use actix_cors::Cors;
use actix_web::{HttpServer, HttpRequest, HttpResponse, App, Responder, get, post, delete, web::{Data, Json, Bytes}};
use serde::Deserialize;
use std::sync::{Arc, Mutex};
use types::{BasedDb, Product, Comment};

#[get("/products")]
async fn get_products(db: Data<Mutex<BasedDb>>) -> impl Responder {
    let db = (**db).lock().unwrap();
    HttpResponse::Ok().json(&db.products)
}

#[get("/product/{id}")]
async fn get_product(db: Data<Mutex<BasedDb>>, req: HttpRequest) -> impl Responder {
    let db = (**db).lock().unwrap();

    let product = db
        .products
        .iter()
        .find(|&p| p.id == req.match_info().get("id").unwrap());

    match product {
        Some(prod) => HttpResponse::Ok().json(prod),
        None => HttpResponse::NotFound().body("404"),
    }
}

#[derive(Deserialize)]
struct ProductCreateRequest {
    pub title: String,
    pub description: String,
    pub image: String,
}

#[post("/products")]
async fn create_product(
    db: Data<Mutex<BasedDb>>,
    req: Json<ProductCreateRequest>,
) -> impl Responder {
    let mut db = (**db).lock().unwrap();

    let last_id: usize = db
        .products
        .iter()
        .map(|prod| prod.clone().id)
        .last()
        .unwrap_or("0".to_string())
        .parse()
        .unwrap();

    db.products.push(Product {
        id: (last_id + 1).to_string(),
        title: req.title.clone(),
        description: req.description.clone(),
        image: req.image.clone(),
        comments: vec![],
    });

    HttpResponse::Created()
}

#[delete("/product/{id}")]
async fn delete_product(db: Data<Mutex<BasedDb>>, req: HttpRequest) -> impl Responder {
    let mut db = (**db).lock().unwrap();

    let index = db.products
        .iter()
        .position(|p| p.id == req.match_info().get("id").unwrap());

    match index {
        Some(i) => {
            db.products.remove(i);
            HttpResponse::NoContent()
        },
        None => HttpResponse::NotFound(),
    }
}

#[post("/product/{id}/comments")]
async fn add_comment(db: Data<Mutex<BasedDb>>, bytes: Bytes, req: HttpRequest) -> impl Responder {
    let mut db = (**db).lock().unwrap();

    match String::from_utf8(bytes.to_vec()) {
        Ok(text) => {
            let index = db.products
                .iter()
                .position(|p| p.id == req.match_info().get("id").unwrap());

            match index {
                Some(i) => {
                    db.products[i].comments.push(Comment {
                        text: text,
                        user_id: "0".to_string(), // TODO
                    });
                    HttpResponse::Created()
                },
                None => HttpResponse::NotFound(),
            }
        },
        Err(_) => HttpResponse::BadRequest(),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let products = Arc::new(Mutex::new(
        BasedDb {
            products: vec!(Product {
                id: "0".to_string(),
                title: "test".to_string(),
                description: "test".to_string(),
                image: "https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ".to_string(),
                comments: vec!(),
            })
        }
    ));

    HttpServer::new(move || {
        App::new()
            .app_data(Data::from(products.clone()))
            .wrap(Cors::permissive())
            .service(get_products)
            .service(get_product)
            .service(create_product)
            .service(delete_product)
            .service(add_comment)
    })
    .bind(("127.0.0.1", 8081))?
    .run()
    .await
}
