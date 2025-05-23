package com.alabenhajsaad.api.business.supplier_order.dto;

import com.alabenhajsaad.api.business.client_order_line.ClientOrderLineResponseDto;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLineDto;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;
@Builder
public record SupplierOrderDto(
        Integer id,
        String orderNumber,
        BigDecimal totalExcludingTax,
        BigDecimal totalIncludingTax,
        PaymentStatus paymentStatus,
        ReceptionStatus receptionStatus,
        List<SupplierOrderLineDto> orderLines
) {
}
