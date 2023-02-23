use std::vec::Vec;

pub struct Product {
    title: String,
    description: String,
    image: String,
    comments: Vec<Comment>,
}

pub struct Comment {
    text: String,
    user_id: String,
}

