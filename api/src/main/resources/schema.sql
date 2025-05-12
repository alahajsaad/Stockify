-- Script de création de base de données pour le système de gestion de commandes
-- MySQL

-- Suppression des tables dans le bon ordre pour respecter les contraintes de clés étrangères
DROP TABLE IF EXISTS client_order_line;
DROP TABLE IF EXISTS supplier_order_line;
DROP TABLE IF EXISTS client_order;
DROP TABLE IF EXISTS supplier_order;
DROP TABLE IF EXISTS phone_number;
DROP TABLE IF EXISTS supplier;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS value_added_tax;

-- Création de la table value_added_tax (taux de TVA)
CREATE TABLE IF NOT EXISTS value_added_tax (
                                               id INT AUTO_INCREMENT PRIMARY KEY,
                                               rate DOUBLE NOT NULL UNIQUE,
                                               description VARCHAR(255)
    );

-- Création de la table category (catégorie de produit)
CREATE TABLE IF NOT EXISTS category (
                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        name VARCHAR(255) UNIQUE
    );

-- Création de la table product (produit)
CREATE TABLE IF NOT EXISTS product (
                                       id INT AUTO_INCREMENT PRIMARY KEY,
                                       designation VARCHAR(255) UNIQUE,
    reference VARCHAR(255) UNIQUE,
    quantity INT CHECK (quantity >= 0),
    last_purchase_price DECIMAL(10,2),
    critical_threshold INT,
    stock_status VARCHAR(255),
    category_id INT,
    vat_id INT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (vat_id) REFERENCES value_added_tax(id)
    );

-- Création de la table Person (table parent)
CREATE TABLE IF NOT EXISTS person (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    created_at DATE,
    updated_at DATE
    );

-- Création de la table Client (hérite de Person)
CREATE TABLE IF NOT EXISTS client (
                                      id BIGINT PRIMARY KEY,
                                      FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE
    );

-- Création de la table Supplier (hérite de Person)
CREATE TABLE IF NOT EXISTS supplier (
                                        id BIGINT PRIMARY KEY,
                                        FOREIGN KEY (id) REFERENCES person(id) ON DELETE CASCADE
    );

-- Création de la table PhoneNumber
CREATE TABLE IF NOT EXISTS phone_number (
                                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                            number VARCHAR(255),
    person_id BIGINT,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
    );

-- Création de la table supplier_order (commande fournisseur)
CREATE TABLE supplier_order (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                order_number VARCHAR(255) NOT NULL,
                                total_excluding_tax DECIMAL(10,2),
                                total_including_tax DECIMAL(10,2),
                                payment_status ENUM('ALL', 'PAID', 'UNPAID'),
                                reception_status ENUM('RECEIVED', 'UNRECEIVED'),
                                supplier_id BIGINT,
                                created_at DATE,
                                updated_at DATE,
                                FOREIGN KEY (supplier_id) REFERENCES supplier(id)
);

-- Création de la table client_order (commande client)
CREATE TABLE client_order (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              order_number VARCHAR(255) NOT NULL,
                              total_excluding_tax DECIMAL(10,2),
                              total_including_tax DECIMAL(10,2),
                              payment_status ENUM('ALL', 'PAID', 'UNPAID'),
                              delivery_status ENUM('ALL', 'DELIVERED', 'UNDELIVERED'),
                              client_id BIGINT,
                              created_at DATE,
                              updated_at DATE,
                              FOREIGN KEY (client_id) REFERENCES client(id)
);

-- Création de la table supplier_order_line (ligne de commande fournisseur)
CREATE TABLE supplier_order_line (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     product_id INT,
                                     supplier_order_id INT,
                                     quantity INT,
                                     unit_price DECIMAL(10,2),
                                     value_added_tax DOUBLE,
                                     FOREIGN KEY (product_id) REFERENCES product(id),
                                     FOREIGN KEY (supplier_order_id) REFERENCES supplier_order(id) ON DELETE CASCADE
);

-- Création de la table client_order_line (ligne de commande client)
CREATE TABLE client_order_line (
                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                   product_id INT,
                                   client_order_id INT,
                                   quantity INT,
                                   unit_price DECIMAL(10,2),
                                   value_added_tax DOUBLE,
                                   FOREIGN KEY (product_id) REFERENCES product(id),
                                   FOREIGN KEY (client_order_id) REFERENCES client_order(id) ON DELETE CASCADE
);

-- Création d'index pour améliorer les performances
CREATE INDEX idx_supplier_order_supplier ON supplier_order(supplier_id);
CREATE INDEX idx_client_order_client ON client_order(client_id);
CREATE INDEX idx_supplier_order_line_order ON supplier_order_line(supplier_order_id);
CREATE INDEX idx_client_order_line_order ON client_order_line(client_order_id);
CREATE INDEX idx_supplier_order_line_product ON supplier_order_line(product_id);
CREATE INDEX idx_client_order_line_product ON client_order_line(product_id);
CREATE INDEX idx_product_category ON product(category_id);
CREATE INDEX idx_product_vat ON product(vat_id);
CREATE INDEX idx_phone_person ON phone_number(person_id);