package com.alabenhajsaad.api.business.client_order_line;

import com.alabenhajsaad.api.business.product.dto.ProductTransactionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientOrderLineRepository extends JpaRepository<ClientOrderLine, Integer> {
    @Query("""
    SELECT new com.alabenhajsaad.api.business.product.dto.ProductTransactionDTO(
        l.quantity, l.unitPrice, 'SALE',
        o.createdAt, CONCAT(c.firstName, ' ', c.lastName), c.id, o.id
    )
    FROM ClientOrderLine l
    JOIN l.order o
    JOIN o.client c
    WHERE l.product.id = :productId
""")
    List<ProductTransactionDTO> findSalesTransactionsByProductId(Integer productId);

}
