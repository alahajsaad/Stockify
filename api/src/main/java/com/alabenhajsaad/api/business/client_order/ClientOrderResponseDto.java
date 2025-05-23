package com.alabenhajsaad.api.business.client_order;

import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLineResponseDto;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record ClientOrderResponseDto(
        Integer id,
        String orderNumber,
        BigDecimal totalExcludingTax,
        BigDecimal totalIncludingTax,
        PaymentStatus paymentStatus,
        DeliveryStatus deliveryStatus,
        List<ClientOrderLineResponseDto> orderLines
) {
}
