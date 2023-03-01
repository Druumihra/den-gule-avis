use serde::{Deserialize, Serialize};
use std::env;

#[derive(Deserialize)]
pub struct User {
    pub id: String,
    pub username: String,
}

pub async fn get_username_by_id(id: usize) -> String {
    #[derive(Serialize)]
    struct Request {
        id: usize,
    }

    #[derive(Deserialize)]
    struct Response {
        username: String,
    }

    reqwest::Client::new()
        .get(request_path("/idToUser"))
        .json(&Request { id: id })
        .send()
        .await
        .expect("Could not get username by id")
        .json::<Response>()
        .await
        .expect("Could not parse json")
        .username
}

pub async fn get_user_by_token(token: String) -> User {
    #[derive(Deserialize)]
    struct Response {
        message: String,
        user: User,
    }

    reqwest::get(request_path(&format!("/tokenToUser/{}", token)))
        .await
        .expect("Could not get user by token")
        .json::<Response>()
        .await
        .expect("Could not parse json")
        .user
}

fn request_path(path: &str) -> String {
    return format!(
        "{}{}",
        env::var("AUTH_SERVER").unwrap_or("http://localhost:8080".to_string()),
        path
    );
}
