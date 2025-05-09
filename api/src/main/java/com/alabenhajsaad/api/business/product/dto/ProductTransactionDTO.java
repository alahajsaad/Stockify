package com.alabenhajsaad.api.business.product.dto;


import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductTransactionDTO(
        Integer quantity,
        BigDecimal unitPrice,
        String transactionType,
        @Getter
        LocalDate transactionDate,
        String partnerName,
        Long partnerId,
        Integer orderId
) {
    public BigDecimal getTotalExcludingTax() {
        return (unitPrice != null && quantity != null) ?
                unitPrice.multiply(BigDecimal.valueOf(quantity)) :
                BigDecimal.ZERO;
    }
}
