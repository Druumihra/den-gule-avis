use async_trait::async_trait;

use crate::{
    database::{Database, Error},
    types::{Product, Comment},
};

pub struct BasedDb {
    products: Vec<Product>,
}

impl BasedDb {
    pub fn new() -> Self {
        Self {
            products: vec!(Product {
                id: "0".to_string(),
                title: "test".to_string(),
                description: "test".to_string(),
                image: "https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ".to_string(),
                comments: vec!(),
            })
        }
    }
}

#[async_trait]
impl Database for BasedDb {
    async fn products(&self) -> Result<Vec<Product>, Error> {
        Ok(self.products.clone())
    }

    async fn add_product(&mut self, title: String, description: String, image: String) -> Result<(), Error> {
        let last_id: usize = self.products
            .iter()
            .map(|prod| prod.clone().id)
            .last()
            .unwrap_or("0".to_string())
            .parse()
            .unwrap();

        self.products.push(Product {
            id: (last_id + 1).to_string(),
            title: title,
            description: description,
            image: image,
            comments: vec!(),
        });

        Ok(())
    }

    async fn product_from_id(&self, id: String) -> Result<Product, Error> {
        match self.products.iter().find(|p| p.id == id) {
            Some(product) => Ok(product.clone()),
            None => Err(Error::NotFound),
        }
    }

    async fn add_comment(&mut self, id: String, comment: String, user_id: String) -> Result<(), Error> {
        for product in &mut self.products {
            if product.id == id {
                product.comments.push(Comment {
                    text: comment,
                    user_id: user_id,
                });
                return Ok(());
            }
        }
        Err(Error::NotFound)
    }

    async fn delete_product(&mut self, id: String) -> Result<(), Error> {
        let index = self.products
            .iter()
            .position(|p| p.id == id);

        match index {
            Some(i) => {
                self.products.remove(i);
                Ok(())
            },
            None => Err(Error::NotFound),
        }
    }
}
