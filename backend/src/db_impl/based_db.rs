use async_trait::async_trait;

use crate::{
    database::{Database, Error},
    types::Product,
};

pub struct BasedDb {
    pub products: Vec<Product>,
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
        todo!()
    }
    async fn add_product(
        &mut self,
        title: String,
        description: String,
        image: String,
    ) -> Result<(), Error> {
        todo!("unimplemented {title} {description} {image}")
    }
    async fn product_from_id(&self, id: String) -> Result<Product, Error> {
        todo!("unimplemented {id}")
    }
    async fn add_comment(&mut self, id: String, comment: String) -> Result<(), Error> {
        todo!("unimplemented {id} {comment}")
    }
    async fn delete_product(&mut self, id: String) -> Result<(), Error> {
        todo!("unimplemented {id}")
    }
}
