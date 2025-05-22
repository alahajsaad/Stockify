package com.alabenhajsaad.api.business.product_transaction;

import com.alabenhajsaad.api.business.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTransactionViewRepository extends JpaRepository<ProductTransactionView, Integer> {
    Page<ProductTransactionView> findByProductId(Integer productId, Pageable pageable);
    Page<ProductTransactionView> findAll(Specification<ProductTransactionView> spec, Pageable pageable);
}

