mod based_db;
mod database;
mod types;

use crate::{based_db::BasedDb, database::Database};
use actix_cors::Cors;
use actix_web::{
    delete, get, post,
    web::{Data, Json, Path},
    App, HttpResponse, HttpServer, Responder,
};
use serde::Deserialize;
use std::sync::Arc;
use tokio::sync::Mutex;
use types::Product;

#[get("/products")]
async fn get_products(db: Data<Mutex<dyn Database>>) -> impl Responder {
    let db = (**db).lock().await;
    match db.products().await {
        Ok(products) => HttpResponse::Ok().json(products),
        Err(_) => HttpResponse::InternalServerError().body("internal server error"),
    }
}

#[get("/product/{id}")]
async fn get_product(db: Data<Mutex<dyn Database>>, id: Path<String>) -> impl Responder {
    let db = (**db).lock().await;

    match db.product_from_id(id.clone()).await {
        Ok(product) => HttpResponse::Ok().json(product),
        Err(database::Error::NotFound) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
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
    db: Data<Mutex<dyn Database>>,
    body: Json<ProductCreateRequest>,
) -> impl Responder {
    let mut db = (**db).lock().await;

    let title = body.title.clone();
    let description = body.description.clone();
    let image = body.image.clone();

    match db.add_product(title, description, image).await {
        Ok(()) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[delete("/products/{id}")]
async fn delete_product(db: Data<Mutex<dyn Database>>, id: Path<String>) -> impl Responder {
    let mut db = (**db).lock().await;

    match db.delete_product(id.clone()).await {
        Ok(()) => HttpResponse::NoContent().finish(),
        Err(database::Error::NotFound) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("/products/{id}/comments")]
async fn add_comment(
    db: Data<Mutex<dyn Database>>,
    body: String,
    id: Path<String>,
) -> impl Responder {
    let mut db = (**db).lock().await;

    match db.add_comment(id.clone(), body).await {
        Ok(()) => HttpResponse::Created(),
        Err(database::Error::NotFound) => HttpResponse::NotFound(),
        Err(_) => HttpResponse::InternalServerError(),
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
    .bind(("0.0.0.0", 8081))?
    .run()
    .await
}
