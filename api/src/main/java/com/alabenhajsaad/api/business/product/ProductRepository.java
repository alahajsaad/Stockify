package com.alabenhajsaad.api.business.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    boolean existsByDesignation(String designation);
    boolean existsByReference(String reference);
    boolean existsByCategory_Id(Integer categoryId);
    boolean existsByVat_Id(Integer vatId);
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

}
