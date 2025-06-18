package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.product.dto.ProductStatistics;
import com.alabenhajsaad.api.core.company.dto.CompanyMetricsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByReferenceInOrDesignationIn(List<String> references, List<String> designations);
    boolean existsByReferenceOrDesignation(String reference, String designation);
    boolean existsByCategory_Id(Integer categoryId);
    boolean existsByVat_Id(Integer vatId);
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    @Query("""
    SELECT new com.alabenhajsaad.api.business.product.dto.ProductStatistics(
        COUNT(p),
        SUM(CASE WHEN p.stockStatus = 'IN_STOCK' THEN 1 ELSE 0 END),
        SUM(CASE WHEN p.stockStatus = 'LOW_STOCK' THEN 1 ELSE 0 END),
        SUM(CASE WHEN p.stockStatus = 'OUT_OF_STOCK' THEN 1 ELSE 0 END)
    )
    FROM Product p
    """)
    ProductStatistics getStatistics();



}
