use async_trait::async_trait;

use crate::{
    database::{Database, Error},
    types::Product,
};

pub struct BasedDb {
    pub products: Vec<Product>,
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
