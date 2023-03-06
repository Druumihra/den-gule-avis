pub struct Orm {

}

#[async_trait]
impl Database for Orm {
    async fn products(&self) {

    }

    async fn add_product(
        &mut self,
        title: String,
        description: String,
        image: String,
    ) -> Result<(), Error> {
    }

    async fn product_from_id(&self, id: String) -> Result<Product, Error> {
    }

    async fn add_comment(
        &mut self,
        product_id: String,
        comment: String,
        user_id: String,
    ) -> Result<(), Error> {
    }

    async fn delete_product(&mut self, id: String) -> Result<(), Error> {
    }
}
