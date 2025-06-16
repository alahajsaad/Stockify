package com.alabenhajsaad.api.business.client_order.dto;

import com.alabenhajsaad.api.business.partner.partner.Partner;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ClientOrderResponseDto(
        Integer id ,
        String orderNumber,
        BigDecimal totalExcludingTax,
        BigDecimal totalIncludingTax,
        PaymentStatus paymentStatus,
        DeliveryStatus deliveryStatus,
        LocalDate createdAt,
        LocalDate updatedAt,
        Partner partner
) {
}
