use std::vec::Vec;
use serde::Serialize;

#[derive(Serialize)]
pub struct Product {
    pub title: String,
    pub description: String,
    pub image: String,
    pub comments: Vec<Comment>,
}

#[derive(Serialize)]
pub struct Comment {
    pub text: String,
    pub user_id: String,
}

