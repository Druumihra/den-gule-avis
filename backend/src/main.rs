mod types;

use actix_web::{HttpServer, HttpRequest, HttpResponse, App, Responder, get, post, web::Data};
use types::Product;
use std::sync::{Arc, Mutex};
use std::vec::Vec;

#[get("/products")]
async fn get_products(db: Data<Mutex<BasedDb>>) -> impl Responder {
    let db = (**db).lock().unwrap();
    HttpResponse::Ok().json(&db.products)
}

#[get("/product/{id}")]
async fn get_product(db: Data<Mutex<BasedDb>>, req: HttpRequest) -> impl Responder {
    let db = (**db).lock().unwrap();
    let product = db.products
        .iter()
        .find(|&p| p.id == req.match_info().get("id").unwrap());

    match product {
        Some(prod) => HttpResponse::Ok().json(prod),
        None => HttpResponse::NotFound().body("404"),
    }
}

#[post("/products")]
async fn create_product() -> impl Responder {
    ""
}

struct BasedDb {
    pub products: Vec<Product>,
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

    HttpServer::new(move ||
        App::new()
            .app_data(Data::from(products.clone()))
            .service(get_products)
            .service(get_product)
            .service(create_product)
        )
        .bind(("127.0.0.1", 8081))?
        .run()
        .await
}
