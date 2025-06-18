package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.business.product.dto.ProductStatistics;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderStatistics;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierOrderRepository extends JpaRepository<SupplierOrder, Integer> {
    Page<SupplierOrder> findAll(Specification<SupplierOrder> spec, Pageable pageable);

    @Query("SELECT s.orderNumber FROM SupplierOrder s ORDER BY s.id DESC LIMIT 1")
    String findLastOrderNumber();

    @Query("""
    SELECT new com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderStatistics(
        SUM(CASE WHEN s.paymentStatus = 'UNPAID' THEN 1 ELSE 0 END),
        SUM(CASE WHEN s.receptionStatus = 'UNRECEIVED' THEN 1 ELSE 0 END),
        CAST(SUM(CASE WHEN s.paymentStatus = 'UNPAID' THEN s.totalExcludingTax ELSE 0 END) AS bigdecimal ),
        CAST(SUM(CASE WHEN s.paymentStatus = 'UNPAID' THEN s.totalIncludingTax ELSE 0 END) AS bigdecimal )
    )
    FROM SupplierOrder s
""")
    SupplierOrderStatistics getStatistics();
}
