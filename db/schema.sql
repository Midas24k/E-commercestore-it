-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

Use ecommerce_db;

CREATE TABLE catagory (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    catagory_name VARCHAR(255) NOT NULL
);

CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (Price >= 0),
    stock INT NOT NULL DEFUALT 10 CHECK (Stock >= 0),
    catagory_id INT, 
    FOREIGN KEY (catagory_id) REFERENCES catagory(id) 
);
CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255)
);

CREATE TABLE productTag (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_tag INT,
    FOREIGN KEY (product_tag) REFERENCES product(id), 
    tag_id INT,
    FOREIGN KEY (tag_id) REFERENCES tag(id) 
);
