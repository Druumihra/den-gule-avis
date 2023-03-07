use async_trait::async_trait;
use quaint::{prelude::*, single::Quaint};
use std::env;

#[derive(Debug)]
pub enum ConnectionError {
    Env,
    Quaint(quaint::error::Error),
}

use crate::{
    database::{self, Database, Error},
    id::gen_64_char_random_valid_string,
    types::{Comment, Product},
};

pub struct Orm {
    connection: Quaint,
}

impl Orm {
    pub async fn new() -> Result<Self, ConnectionError> {
        let database_url = env::var("DATABASE_URL").map_err(|_| ConnectionError::Env)?;
        let connection = Quaint::new(&database_url)
            .await
            .map_err(|err| ConnectionError::Quaint(err))?;

        Ok(Self { connection })
    }
}

struct SqlComment {
    pub id: String,
    pub text: String,
    pub user_id: String,
    pub product_id: String,
}

#[async_trait]
impl Database for Orm {
    async fn products(&self) -> Result<Vec<Product>, Error> {
        let query = Select::from_table("comments");
        let comments = self
            .connection
            .select(query)
            .await
            .map_err(|_| database::Error::Network)?
            .into_iter()
            .map(|row| {
                Some(SqlComment {
                    id: row[0].clone().try_into().ok()?,
                    text: row[1].clone().try_into().ok()?,
                    user_id: row[2].clone().try_into().ok()?,
                    product_id: row[3].clone().try_into().ok()?,
                })
            })
            .filter_map(|p| p)
            .collect::<Vec<SqlComment>>();

        let query = Select::from_table("products");
        let products = self
            .connection
            .select(query)
            .await
            .map_err(|_| database::Error::Network)?;

        Ok(products
            .into_iter()
            .map(|row| {
                let id = row[0].clone().try_into().ok()?;
                let title = row[1].clone().try_into().ok()?;
                let description = row[2].clone().try_into().ok()?;
                let image = row[3].clone().try_into().ok()?;
                let comments = comments
                    .iter()
                    .filter(|comment| comment.product_id == id)
                    .map(|comment| Comment {
                        id: comment.id.clone(),
                        text: comment.text.clone(),
                        user_id: comment.user_id.clone(),
                    })
                    .collect();

                Some(Product {
                    id,
                    title,
                    description,
                    image,
                    comments,
                })
            })
            .filter_map(|p| p)
            .collect())
    }

    async fn add_product(
        &mut self,
        title: String,
        description: String,
        image: String,
    ) -> Result<(), Error> {
        let insert = Insert::single_into("products")
            .value(
                "id",
                gen_64_char_random_valid_string().map_err(|_| Error::SSL)?,
            )
            .value("title", title)
            .value("description", description)
            .value("image", image);

        self.connection
            .insert(insert.into())
            .await
            .map_err(|_| Error::Network)?;

        Ok(())
    }

    async fn product_from_id(&self, id: String) -> Result<Product, Error> {
        let query = Select::from_table("comments").so_that("product_id".equals(id.clone()));
        let comments = self
            .connection
            .select(query)
            .await
            .map_err(|_| database::Error::Network)?
            .into_iter()
            .map(|row| {
                Some(Comment {
                    id: row[0].clone().try_into().ok()?,
                    text: row[1].clone().try_into().ok()?,
                    user_id: row[2].clone().try_into().ok()?,
                })
            })
            .filter_map(|p| p)
            .collect::<Vec<Comment>>();

        let query = Select::from_table("products").so_that("id".equals(id));
        self.connection
            .select(query)
            .await
            .map_err(|_| database::Error::Network)?
            .into_iter()
            .nth(0)
            .map(|row| {
                let id = row[0].clone().try_into().ok()?;
                let title = row[1].clone().try_into().ok()?;
                let description = row[2].clone().try_into().ok()?;
                let image = row[3].clone().try_into().ok()?;
                Some(Product {
                    id,
                    title,
                    description,
                    image,
                    comments,
                })
            })
            .flatten()
            .ok_or_else(|| Error::NotFound)
    }

    async fn add_comment(
        &mut self,
        product_id: String,
        comment: String,
        user_id: String,
    ) -> Result<(), Error> {
        let insert = Insert::single_into("comments")
            .value("product_id", product_id)
            .value("text", comment)
            .value("user_id", user_id);

        self.connection
            .insert(insert.into())
            .await
            .map_err(|_| Error::Network)?;

        Ok(())
    }

    async fn delete_product(&mut self, id: String) -> Result<(), Error> {
        let delete = Delete::from_table("products").so_that("id".equals(id));

        self.connection
            .delete(delete.into())
            .await
            .map_err(|_| Error::Network)?;

        Ok(())
    }
}
