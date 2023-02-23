mod types;

use actix_web::{HttpServer, App, Responder, get, web};
use types::Product;

#[get("/products")]
async fn get_products() -> impl Responder {
    web::Json(
        Product {
            title: "test".to_string(),
            description: "test".to_string(),
            image: "https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ".to_string(),
            comments: vec!(),
        }
    )
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new()
        .service(get_products))
        .bind(("127.0.0.1", 8081))?
        .run()
        .await
}
