use crate::types::Product;
use async_trait::async_trait;

pub enum Error {
    NotFound,
    Duplicate,
}

#[async_trait]
pub trait Database {
    async fn products(&self) -> Result<Vec<Product>, Error>;
    async fn add_product(
        &mut self,
        title: String,
        description: String,
        image: String,
    ) -> Result<(), Error>;
    async fn product_from_id(&self, id: String) -> Result<Product, Error>;
    async fn add_comment(&mut self, post_id: String, comment: String) -> Result<(), Error>;
    async fn delete_product(&mut self, id: String) -> Result<(), Error>;
}
