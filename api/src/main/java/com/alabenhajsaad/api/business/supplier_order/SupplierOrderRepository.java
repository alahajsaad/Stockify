package com.alabenhajsaad.api.business.supplier_order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierOrderRepository extends JpaRepository<SupplierOrder, Integer> {
    @Query("SELECT o.orderNumber FROM SupplierOrder o ORDER BY o.id DESC LIMIT 1")
    String findLastOrderNumber();
}
