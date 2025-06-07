package com.alabenhajsaad.api.business.supplier_order.mapper;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.client_order.ClientOrderResponseDto;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLineResponseDto;
import com.alabenhajsaad.api.business.supplier_order.SupplierOrder;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderDto;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLine;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLineDto;
import com.alabenhajsaad.api.business.utils.LineAction;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SupplierOrderMapperImpl implements SupplierOrderMapper {

    @Override
    public SupplierOrderDto toSupplierOrderDto(SupplierOrder supplierOrder) {

        Map<LineAction, List<SupplierOrderLine>> lineDtos = supplierOrder.getOrderLines()
                .stream()
                .collect(Collectors.groupingBy(line -> LineAction.DO_NOTHING));

        return SupplierOrderDto.builder()
                .id(supplierOrder.getId())
                .orderNumber(supplierOrder.getOrderNumber())
                .totalExcludingTax(supplierOrder.getTotalExcludingTax())
                .totalIncludingTax(supplierOrder.getTotalIncludingTax())
                .paymentStatus(supplierOrder.getPaymentStatus())
                .receptionStatus(supplierOrder.getReceptionStatus())
                .supplierOrderLine(lineDtos)
                .partner(supplierOrder.getPartner())
                .build();
    }
}
