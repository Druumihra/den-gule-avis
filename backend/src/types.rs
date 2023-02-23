use std::vec::Vec;
use serde::Serialize;

#[derive(Serialize, Clone)]
pub struct Product {
    pub id: String,
    pub title: String,
    pub description: String,
    pub image: String,
    pub comments: Vec<Comment>,
}

#[derive(Serialize, Clone)]
pub struct Comment {
    pub text: String,
    pub user_id: String,
}

