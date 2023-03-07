DROP DATABASE IF EXISTS backend;
DROP DATABASE IF EXISTS auth;

CREATE DATABASE backend;

USE backend;

CREATE TABLE products(
	id NVARCHAR(64) PRIMARY KEY NOT NULL,
	title TEXT NOT NULL,
	description TEXT NOT NULL,
	image TEXT NOT NULL
);

CREATE TABLE comments(
	id NVARCHAR(64) PRIMARY KEY NOT NULL,
	text TEXT NOT NULL,
	user_id NVARCHAR(64) NOT NULL,
	product_id NVARCHAR(64) NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (id, title, description, image) VALUES ("a", "flot fyr 1", "mon han kan lide krabbesproget?", "https://tpho.dk/images/me.png");
INSERT INTO products (id, title, description, image) VALUES ("b", "flot fyr 2", "mon han kan lide krabbesproget?", "https://tpho.dk/images/me.png");
INSERT INTO products (id, title, description, image) VALUES ("c", "flot fyr 3", "mon han kan lide krabbesproget?", "https://tpho.dk/images/me.png");

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

