package com.alabenhajsaad.api.business.client_order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientOrderRepository extends JpaRepository<ClientOrder, Integer> {
    Page<ClientOrder> findAll(Specification<ClientOrder> spec, Pageable pageable);

    @Query("SELECT o.orderNumber FROM ClientOrder o ORDER BY o.id DESC LIMIT 1")
    String findLastOrderNumber();

}
