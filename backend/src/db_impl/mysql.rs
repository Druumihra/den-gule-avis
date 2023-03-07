use std::env;

use async_trait::async_trait;
use sqlx::mysql::MySqlPool;

use crate::{
    database::{Database, Error},
    id::gen_64_char_random_valid_string,
    types::{Comment, Product},
};

pub struct MySql {
    pool: MySqlPool,
}

#[derive(Debug)]
pub enum ConnectionError {
    Sqlx(sqlx::Error),
    Env,
}

impl MySql {
    pub async fn new() -> Result<Self, ConnectionError> {
        let pool = MySqlPool::connect(&env::var("DATABASE_URL").map_err(|_| ConnectionError::Env)?)
            .await
            .map_err(|err| ConnectionError::Sqlx(err))?;
        Ok(Self { pool })
    }
}

#[async_trait]
impl Database for MySql {
    async fn products(&self) -> Result<Vec<Product>, Error> {
        let mut products: Vec<Product> =
            sqlx::query!("SELECT id, title, description, image FROM products;")
                .fetch_all(&self.pool)
                .await
                .map_err(|_| Error::Network)?
                .into_iter()
                .map(|product| Product {
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    description: product.description,
                    comments: Vec::new(),
                })
                .collect();

        sqlx::query!("SELECT id, text, user_id, product_id FROM comments;")
            .fetch_all(&self.pool)
            .await
            .map_err(|_| Error::Network)?
            .into_iter()
            .for_each(|comment| {
                let product = products
                    .iter_mut()
                    .find(|product| product.id == comment.product_id.to_string())
                    .expect("should find due to foreign key constraints");

                let comment = Comment {
                    id: comment.id.to_string(),
                    user_id: comment.user_id,
                    text: comment.text,
                };
                (*product).comments.push(comment);
            });

        Ok(products)
    }
    async fn add_product(
        &mut self,
        title: String,
        description: String,
        image: String,
    ) -> Result<(), Error> {
        sqlx::query!(
            "INSERT INTO products (id, title, description, image) VALUES (?, ?, ?, ?);",
            gen_64_char_random_valid_string().map_err(|_| Error::SSL)?,
            title,
            description,
            image
        )
        .execute(&self.pool)
        .await
        .map_err(|_| Error::Network)?;

        Ok(())
    }
    async fn product_from_id(&self, id: String) -> Result<Product, Error> {
        let product = sqlx::query!(
            "SELECT id, title, description, image FROM products WHERE id = ?;",
            id
        )
        .fetch_one(&self.pool)
        .await
        .map_err(|err| match err {
            sqlx::Error::RowNotFound => Error::NotFound,
            _ => Error::Network,
        })?;

        let comments: Vec<Comment> = sqlx::query!(
            "SELECT id, text, user_id FROM comments WHERE product_id = ?;",
            id
        )
        .fetch_all(&self.pool)
        .await
        .map_err(|_| Error::Network)?
        .into_iter()
        .map(|comment| Comment {
            id: comment.id.to_string(),
            user_id: comment.user_id,
            text: comment.text,
        })
        .collect();

        Ok(Product {
            id: product.id.to_string(),
            title: product.title,
            description: product.description,
            image: product.image,
            comments,
        })
    }
    async fn add_comment(
        &mut self,
        product_id: String,
        comment: String,
        user_id: String,
    ) -> Result<(), Error> {
        sqlx::query!(
            "INSERT INTO comments (id, text, product_id, user_id) VALUES (?, ?, ?, ?);",
            gen_64_char_random_valid_string().map_err(|_| Error::SSL)?,
            comment,
            product_id,
            user_id,
        )
        .execute(&self.pool)
        .await
        .map_err(|err| match err {
            sqlx::Error::RowNotFound => Error::NotFound,
            _ => Error::Network,
        })?;

        Ok(())
    }
    async fn delete_product(&mut self, id: String) -> Result<(), Error> {
        todo!("unimplemented {id}")
    }
}
