package com.alabenhajsaad.api.business.product_transaction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface ProductTransactionService {
    Page<ProductTransactionView> getTransactionsByProductId(
            Integer productId,
            String transactionType,
            String keyword,
            LocalDate startDate,
            LocalDate endDate,
            Integer counterpartId  ,
            Pageable pageable
    );
}
