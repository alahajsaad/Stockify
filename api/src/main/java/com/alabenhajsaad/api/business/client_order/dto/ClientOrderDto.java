package com.alabenhajsaad.api.business.client_order.dto;

import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
import com.alabenhajsaad.api.business.partner.partner.Partner;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.LineAction;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Builder
public record ClientOrderDto(
        Integer id,
        String orderNumber,
        BigDecimal totalExcludingTax,
        BigDecimal totalIncludingTax,
        PaymentStatus paymentStatus,
        DeliveryStatus deliveryStatus,
        Map<LineAction,List<ClientOrderLine>> clientOrderLine,
        Partner partner
) {
}
