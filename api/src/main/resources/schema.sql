CREATE TABLE IF NOT EXISTS value_added_tax (
   id INT AUTO_INCREMENT PRIMARY KEY,
   rate DOUBLE NOT NULL UNIQUE,
   description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS product (
   id INT AUTO_INCREMENT PRIMARY KEY,
   designation VARCHAR(255) UNIQUE,
    reference VARCHAR(255) UNIQUE,
    quantity INT,
    critical_threshold INT,
    product_status VARCHAR(255),
    category_id INT,
    vat_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (vat_id) REFERENCES value_added_tax(id)
);
