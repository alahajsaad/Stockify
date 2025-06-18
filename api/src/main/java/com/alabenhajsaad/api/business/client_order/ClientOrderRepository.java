package com.alabenhajsaad.api.business.client_order;

import com.alabenhajsaad.api.business.client_order.dto.ClientOrderStatistics;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientOrderRepository extends JpaRepository<ClientOrder, Integer> {
    Page<ClientOrder> findAll(Specification<ClientOrder> spec, Pageable pageable);

    @Query("SELECT o.orderNumber FROM ClientOrder o ORDER BY o.id DESC LIMIT 1")
    String findLastOrderNumber();

    @Query("""
    SELECT new com.alabenhajsaad.api.business.client_order.dto.ClientOrderStatistics(
        SUM(CASE WHEN c.paymentStatus = 'UNPAID' THEN 1 ELSE 0 END),
        SUM(CASE WHEN c.deliveryStatus = 'UNDELIVERED' THEN 1 ELSE 0 END),
        CAST(SUM(CASE WHEN c.paymentStatus = 'UNPAID' THEN c.totalExcludingTax ELSE 0 END) AS bigdecimal ),
        CAST(SUM(CASE WHEN c.paymentStatus = 'UNPAID' THEN c.totalIncludingTax ELSE 0 END) AS bigdecimal )
    )
    FROM ClientOrder c
""")
    ClientOrderStatistics getStatistics();
}
