package com.alabenhajsaad.api.business.client_order.dto;

import java.math.BigDecimal;

public record ClientOrderStatistics(
        Long totalUnpaid,
        Long totalUndelivered,
        BigDecimal totalAmountToPay,
        BigDecimal totalAmountIncludingTaxToPay
) {
}
