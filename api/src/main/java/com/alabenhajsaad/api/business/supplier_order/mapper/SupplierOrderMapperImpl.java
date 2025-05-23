package com.alabenhajsaad.api.business.supplier_order.mapper;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.client_order.ClientOrderResponseDto;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLineResponseDto;
import com.alabenhajsaad.api.business.supplier_order.SupplierOrder;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderDto;
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
        List<SupplierOrderLineDto> lineDtos = supplierOrder.getOrderLines()
                .stream()
                .map(line -> SupplierOrderLineDto.builder()
                        .supplierOrderLine(Map.of(LineAction.DO_NOTHING, line))
                        .build())
                .collect(Collectors.toList());

        return SupplierOrderDto.builder()
                .id(supplierOrder.getId())
                .orderNumber(supplierOrder.getOrderNumber())
                .totalExcludingTax(supplierOrder.getTotalExcludingTax())
                .totalIncludingTax(supplierOrder.getTotalIncludingTax())
                .paymentStatus(supplierOrder.getPaymentStatus())
                .receptionStatus(supplierOrder.getReceptionStatus())
                .orderLines(lineDtos)
                .build();
    }
}
