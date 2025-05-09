package com.alabenhajsaad.api.business.supplier_order_line;

import com.alabenhajsaad.api.business.product.dto.ProductTransactionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplierOrderLineRepository extends JpaRepository<SupplierOrderLine, Integer> {
    @Query("""
    SELECT new com.alabenhajsaad.api.business.product.dto.ProductTransactionDTO(
        l.quantity, l.unitPrice, 'PURCHASE',
        o.createdAt, CONCAT(s.firstName, ' ', s.lastName), s.id, o.id
    )
    FROM SupplierOrderLine l
    JOIN l.order o
    JOIN o.supplier s
    WHERE l.product.id = :productId
""")
    List<ProductTransactionDTO> findPurchaseTransactionsByProductId(Integer productId);

}
