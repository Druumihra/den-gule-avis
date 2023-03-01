USE database;

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
