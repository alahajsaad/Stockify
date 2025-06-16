package com.alabenhajsaad.api.business.supplier_order.dto;

import com.alabenhajsaad.api.business.partner.partner.Partner;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLine;
import com.alabenhajsaad.api.business.utils.LineAction;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Builder
public record SupplierOrderDto(
        Integer id,
        String orderNumber,
        BigDecimal totalExcludingTax,
        BigDecimal totalIncludingTax,
        PaymentStatus paymentStatus,
        ReceptionStatus receptionStatus,
        Map<LineAction, List<SupplierOrderLine>> supplierOrderLine,
        Partner partner
) {
}
