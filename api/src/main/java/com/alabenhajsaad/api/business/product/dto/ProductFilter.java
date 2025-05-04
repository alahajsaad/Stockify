package com.alabenhajsaad.api.business.product.dto;

import com.alabenhajsaad.api.business.product.StockStatus;

public record ProductFilter(
        Integer categoryId,
        StockStatus status ,
        String keyword
) {
}
