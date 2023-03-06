DROP DATABASE IF EXISTS backend;
DROP DATABASE IF EXISTS auth;

CREATE DATABASE backend;

USE backend;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS products;

CREATE TABLE products(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title TEXT NOT NULL,
description TEXT NOT NULL,
image TEXT NOT NULL
);

CREATE TABLE comments(
id INT PRIMARY KEY AUTO_INCREMENT,
text TEXT NOT NULL,
user_id TEXT NOT NULL,
product_id INT NOT NULL,
FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (title, description, image) VALUES ("flot fyr 1", "mon han kan lide krabbesproget?", "https://tpho.dk/images/me.png");
INSERT INTO products (title, description, image) VALUES ("flot fyr 2", "mon han kan lide krabbesproget?", "https://tpho.dk/images/me.png");
INSERT INTO products (title, description, image) VALUES ("flot fyr 3", "mon han kan lide krabbesproget?", "https://tpho.dk/images/me.png");

CREATE DATABASE auth;

USE auth;
CREATE TABLE users (
	id NVARCHAR(64) NOT NULL PRIMARY KEY,
	name TEXT NOT NULL,
	password NVARCHAR(150) NOT NULL
);

CREATE TABLE sessions (
	id NVARCHAR(64) NOT NULL PRIMARY KEY,
	token NVARCHAR(64) NOT NULL,
	userId NVARCHAR(64) NOT NULL
); 

