package com.alabenhajsaad.api.business.supplier_order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierOrderRepository extends JpaRepository<SupplierOrder, Integer> {
    Page<SupplierOrder> findAll(Specification<SupplierOrder> spec, Pageable pageable);

    @Query("SELECT s.orderNumber FROM SupplierOrder s ORDER BY s.id DESC LIMIT 1")
    String findLastOrderNumber();
}
