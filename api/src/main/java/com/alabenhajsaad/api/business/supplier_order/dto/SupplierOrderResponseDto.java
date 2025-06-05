package com.alabenhajsaad.api.business.supplier_order.dto;

import com.alabenhajsaad.api.business.partner.partner.Partner;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public record SupplierOrderResponseDto(
        Integer id ,
        String orderNumber,
        BigDecimal totalExcludingTax,
        BigDecimal totalIncludingTax,
        PaymentStatus paymentStatus,
        ReceptionStatus receptionStatus,
        LocalDate createdAt,
        LocalDate updatedAt,
        Partner partner
) {
}
