package com.alabenhajsaad.api.business.product.dto;

import com.alabenhajsaad.api.business.product.StockStatus;
import org.springframework.data.domain.Pageable;

public record ProductFilter(
        Integer categoryId,
        StockStatus status ,
        String keyword,
        Pageable pageable
) {
}
