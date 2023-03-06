mod auth;
mod database;
mod db_impl;
mod types;

use crate::database::Database;
use actix_cors::Cors;
use actix_web::{
    delete, get, post,
    web::{Data, Json, Path},
    App, HttpResponse, HttpServer, Responder,
};
use serde::Deserialize;
use serde::Serialize;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::Mutex;

type DbParam = Mutex<dyn Database + Send + Sync>;

#[derive(Serialize)]
struct ProductResponse {
    pub id: String,
    pub title: String,
    pub description: String,
    pub image: String,
    pub comments: Vec<CommentResponse>,
}

#[derive(Serialize)]
struct CommentResponse {
    pub id: String,
    pub text: String,
    pub username: String,
}

#[get("/products")]
async fn get_products(db: Data<DbParam>) -> impl Responder {
    let db = (**db).lock().await;

    match db.products().await {
        Ok(products) => HttpResponse::Ok().json(products),
        Err(_) => HttpResponse::InternalServerError().body("internal server error"),
    }
}

#[get("/product/{id}")]
async fn get_product(db: Data<DbParam>, id: Path<String>) -> impl Responder {
    let db = (**db).lock().await;

    match db.product_from_id(id.clone()).await {
        Ok(product) => {
            let mut user_id_name_map: HashMap<String, String> = HashMap::new();
            for comment in product.comments.iter() {
                if user_id_name_map.contains_key(&comment.user_id) {
                    continue;
                }
                user_id_name_map.insert(
                    comment.user_id.clone(),
                    auth::get_username_by_id(comment.user_id.clone())
                        .await
                        .unwrap_or(format!("Unknown user #{}", comment.user_id)),
                );
            }

            HttpResponse::Ok().json(ProductResponse {
                id: product.id.clone(),
                title: product.title.clone(),
                description: product.description.clone(),
                image: product.image.clone(),
                comments: product
                    .comments
                    .iter()
                    .map(|comment| CommentResponse {
                        id: comment.id.clone(),
                        text: comment.text.clone(),
                        username: user_id_name_map
                            .get(&comment.user_id)
                            .unwrap_or(&"Unknown".to_string())
                            .clone(),
                    })
                    .collect(),
            })
        }
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
async fn create_product(db: Data<DbParam>, body: Json<ProductCreateRequest>) -> impl Responder {
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
async fn delete_product(db: Data<DbParam>, id: Path<String>) -> impl Responder {
    let mut db = (**db).lock().await;

    match db.delete_product(id.clone()).await {
        Ok(()) => HttpResponse::NoContent().finish(),
        Err(database::Error::NotFound) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[derive(Deserialize)]
struct AddCommentRequest {
    pub token: String,
    pub text: String,
}

#[post("/products/{id}/comments")]
async fn add_comment(
    db: Data<DbParam>,
    body: Json<AddCommentRequest>,
    id: Path<String>,
) -> impl Responder {
    let mut db = (**db).lock().await;

    let user_id = auth::get_user_by_token(body.token.clone()).await.id;

    match db.add_comment(id.clone(), body.text.clone(), user_id).await {
        Ok(()) => HttpResponse::Created(),
        Err(database::Error::NotFound) => HttpResponse::NotFound(),
        Err(_) => HttpResponse::InternalServerError(),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    #[cfg(any(feature = "mysql", feature = "orm"))]
    if dotenv::dotenv().is_err() {
        println!("Unable to find .env file");
    };

    #[cfg(feature = "based_db")]
    let db = {
        use db_impl::based_db::BasedDb;
        BasedDb::new()
    };

    #[cfg(feature = "mysql")]
    let db = {
        use db_impl::mysql::MySql;
        match MySql::new().await {
            Ok(db) => db,
            Err(err) => {
                println!("Unable to connect to db: {err:?}");
                std::process::exit(1);
            }
        }
    };

    #[cfg(feature = "orm")]
    let db = {
        use db_impl::orm::Orm;
        match Orm::new().await {
            Ok(db) => db,
            Err(err) => {
                println!("Unable to connect to db: {err:?}");
                std::process::exit(1);
            }
        }
    };

    let db: Arc<DbParam> = Arc::new(Mutex::new(db));
    let db: Data<DbParam> = Data::from(db);

    HttpServer::new(move || {
        App::new()
            .app_data(Data::clone(&db))
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
