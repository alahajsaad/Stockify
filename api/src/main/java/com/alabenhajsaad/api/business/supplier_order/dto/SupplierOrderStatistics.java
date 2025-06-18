package com.alabenhajsaad.api.business.supplier_order.dto;

import java.math.BigDecimal;

public record SupplierOrderStatistics(
        Long totalUnpaid,
        Long totalUnreceived,
        BigDecimal totalAmountToPay,
        BigDecimal totalAmountIncludingTaxToPay
) {
}
