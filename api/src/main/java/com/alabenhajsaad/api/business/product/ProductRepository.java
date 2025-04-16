package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
