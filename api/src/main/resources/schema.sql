-- Script de création de base de données pour le système de gestion de commandes
-- MySQL

-- Suppression des tables dans le bon ordre pour respecter les contraintes de clés étrangères
DROP TABLE IF EXISTS client_order_line;
DROP TABLE IF EXISTS supplier_order_line;
DROP TABLE IF EXISTS client_order;
DROP TABLE IF EXISTS supplier_order;
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
    last_sale_price DECIMAL(10,2),
    critical_threshold INT,
    stock_status VARCHAR(255),
    category_id INT,
    vat_id INT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (vat_id) REFERENCES value_added_tax(id)
    );

-- Table principale Partner (table parent pour l'héritage)
CREATE TABLE IF NOT EXISTS partner (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       entity_type VARCHAR(50) NOT NULL,
    role_type VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    );

-- Table Person (hérite de Partner)
CREATE TABLE IF NOT EXISTS person (
                                      id BIGINT PRIMARY KEY,
                                      first_name VARCHAR(255),
    last_name VARCHAR(255),
    FOREIGN KEY (id) REFERENCES partner(id) ON DELETE CASCADE
    );

-- Table Organization (hérite de Partner)
CREATE TABLE IF NOT EXISTS organization (
                                            id BIGINT PRIMARY KEY,
                                            company_name VARCHAR(255),
    registration_number VARCHAR(255),
    tax_number VARCHAR(255),
    FOREIGN KEY (id) REFERENCES partner(id) ON DELETE CASCADE
    );

-- Table PhoneNumber
CREATE TABLE IF NOT EXISTS phone_number (
                                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                            number VARCHAR(255) UNIQUE,
    partner_id BIGINT,
    FOREIGN KEY (partner_id) REFERENCES partner(id) ON DELETE CASCADE
    );

-- Table Address
CREATE TABLE IF NOT EXISTS address (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       street_address VARCHAR(255),
    city VARCHAR(255),
    partner_id BIGINT,
    FOREIGN KEY (partner_id) REFERENCES partner(id) ON DELETE CASCADE
    );



-- Création de la table supplier_order (commande fournisseur)
CREATE TABLE supplier_order (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                order_number VARCHAR(255) NOT NULL,
                                total_excluding_tax DECIMAL(10,2),
                                total_including_tax DECIMAL(10,2),
                                payment_status ENUM('ALL', 'PAID', 'UNPAID'),
                                reception_status ENUM('RECEIVED', 'UNRECEIVED'),
                                partner_id BIGINT,
                                created_at DATE,
                                updated_at DATE,
                                FOREIGN KEY (partner_id) REFERENCES partner(id)
);

-- Création de la table client_order (commande client)
CREATE TABLE client_order (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              order_number VARCHAR(255) NOT NULL,
                              total_excluding_tax DECIMAL(10,2),
                              total_including_tax DECIMAL(10,2),
                              payment_status ENUM('ALL', 'PAID', 'UNPAID'),
                              delivery_status ENUM('ALL', 'DELIVERED', 'UNDELIVERED'),
                              partner_id BIGINT,
                              created_at DATE,
                              updated_at DATE,
                              FOREIGN KEY (partner_id) REFERENCES partner(id)
);

-- Création de la table supplier_order_line (ligne de commande fournisseur)
CREATE TABLE supplier_order_line (
     id INT AUTO_INCREMENT PRIMARY KEY,
     product_id INT,
     supplier_order_id INT,
     quantity INT,
     unit_price DECIMAL(10,2),
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
       FOREIGN KEY (product_id) REFERENCES product(id),
       FOREIGN KEY (client_order_id) REFERENCES client_order(id) ON DELETE CASCADE
);


CREATE OR REPLACE VIEW product_transactions AS
SELECT
    col.id AS line_id,
    co.order_number AS order_number,
    col.product_id,
    col.quantity,
    col.unit_price,
    'SALE' AS transaction_type,
    c.id AS counterpart_id,
    c.name AS counterpart_name,
    co.created_at AS transaction_date
FROM client_order_line col
         JOIN client_order co ON col.order_id = co.id
         JOIN client c ON co.client_id = c.id

UNION ALL

SELECT
    sol.id AS line_id,
    so.order_number AS order_number,
    sol.product_id,
    sol.quantity,
    sol.unit_price,
    'PURCHASE' AS transaction_type,
    s.id AS counterpart_id,
    s.name AS counterpart_name,
    so.created_at AS transaction_date
FROM supplier_order_line sol
         JOIN supplier_order so ON sol.order_id = so.id
         JOIN supplier s ON so.supplier_id = s.id;


-- Création d'index pour améliorer les performances
CREATE INDEX idx_supplier_order_supplier ON supplier_order(supplier_id);
CREATE INDEX idx_client_order_client ON client_order(client_id);
CREATE INDEX idx_supplier_order_line_order ON supplier_order_line(supplier_order_id);
CREATE INDEX idx_client_order_line_order ON client_order_line(client_order_id);
CREATE INDEX idx_supplier_order_line_product ON supplier_order_line(product_id);
CREATE INDEX idx_client_order_line_product ON client_order_line(product_id);
CREATE INDEX idx_product_category ON product(category_id);
CREATE INDEX idx_product_vat ON product(vat_id);


-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_partner_email ON partner(email);
CREATE INDEX IF NOT EXISTS idx_partner_entity_type ON partner(entity_type);
CREATE INDEX IF NOT EXISTS idx_phone_number_partner_id ON phone_number(partner_id);
CREATE INDEX IF NOT EXISTS idx_address_partner_id ON address(partner_id);