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
    quantity INT CHECK (quantity >= 0),
    last_purchase_price DECIMAL(10,2);
    critical_threshold INT,
    product_status VARCHAR(255),
    category_id INT,
    vat_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (vat_id) REFERENCES value_added_tax(id)
);

-- Création de la table Person (table parent)
CREATE TABLE IF NOT EXISTS person (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255)
);

-- Création de la table Client (hérite de Person)
CREATE TABLE IF NOT EXISTS client (
   id BIGINT PRIMARY KEY,
   FOREIGN KEY (id) REFERENCES person(id)
);

-- Création de la table Supplier (hérite de Person)
CREATE TABLE IF NOT EXISTS supplier (
    id BIGINT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES person(id)
);

-- Création de la table PhoneNumber
CREATE TABLE IF NOT EXISTS phone_number (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(255),
    person_id BIGINT,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE IF NOT EXISTS supplier_order (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(255) NOT NULL,
    total_excluding_tax DECIMAL(19,2),
    total_including_tax DECIMAL(19,2),
    payment_mode VARCHAR(50),
    payment_due_date DATE,
    desired_delivery_date DATE,
    is_received BOOLEAN,
    created_at DATE,
    updated_at DATE,
    supplier_id BIGINT,

    CONSTRAINT fk_supplier
    FOREIGN KEY (supplier_id)
    REFERENCES supplier(id)
    );


CREATE TABLE supplier_order_line (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     product_id INT,
     supplier_order_id INT,
     quantity INT,
     unit_price DECIMAL(10,2),
     value_added_tax DECIMAL(10,2),

     CONSTRAINT fk_product
         FOREIGN KEY (product_id)
             REFERENCES product(id),

     CONSTRAINT fk_supplier_order
         FOREIGN KEY (supplier_order_id)
             REFERENCES supplier_order(id)
);



