use async_trait::async_trait;

use crate::{
    database::{Database, Error},
    types::{Comment, Product},
};

pub struct BasedDb {
    products: Vec<Product>,
    id_counter: u32,
}

impl BasedDb {
    pub fn new() -> Self {
        Self {
            id_counter: 0,
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

    async fn add_product(
        &mut self,
        title: String,
        description: String,
        image: String,
    ) -> Result<(), Error> {
        self.products.push(Product {
            id: (self.id_counter + 1).to_string(),
            title,
            description,
            image,
            comments: vec![],
        });
        self.id_counter += 1;

        Ok(())
    }

    async fn product_from_id(&self, id: String) -> Result<Product, Error> {
        match self.products.iter().find(|p| p.id == id) {
            Some(product) => Ok(product.clone()),
            None => Err(Error::NotFound),
        }
    }

    async fn add_comment(
        &mut self,
        product_id: String,
        comment: String,
        user_id: String,
    ) -> Result<(), Error> {
        let product = self
            .products
            .iter_mut()
            .find(|product| product.id == product_id)
            .ok_or(Error::NotFound)?;

        (*product).comments.push(Comment {
            id: self.id_counter.to_string(),
            text: comment,
            user_id,
        });

        self.id_counter += 1;

        Ok(())
    }

    async fn delete_product(&mut self, id: String) -> Result<(), Error> {
        let index = self.products.iter().position(|p| p.id == id);

        match index {
            Some(i) => {
                self.products.remove(i);
                Ok(())
            }
            None => Err(Error::NotFound),
        }
    }
}
