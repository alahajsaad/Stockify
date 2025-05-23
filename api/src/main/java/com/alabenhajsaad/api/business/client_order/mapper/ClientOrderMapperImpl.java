package com.alabenhajsaad.api.business.client_order.mapper;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.client_order.ClientOrderResponseDto;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLineResponseDto;
import com.alabenhajsaad.api.business.utils.LineAction;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ClientOrderMapperImpl implements ClientOrderMapper{
    @Override
    public ClientOrderResponseDto toClientOrderResponseDto(ClientOrder clientOrder) {
        List<ClientOrderLineResponseDto> lineDtos = clientOrder.getOrderLines()
                .stream()
                .map(line -> ClientOrderLineResponseDto.builder()
                        .clientOrderLine(Map.of(LineAction.DO_NOTHING, line))
                        .build())
                .collect(Collectors.toList());

        return ClientOrderResponseDto.builder()
                .id(clientOrder.getId())
                .orderNumber(clientOrder.getOrderNumber())
                .totalExcludingTax(clientOrder.getTotalExcludingTax())
                .totalIncludingTax(clientOrder.getTotalIncludingTax())
                .paymentStatus(clientOrder.getPaymentStatus())
                .deliveryStatus(clientOrder.getDeliveryStatus())
                .orderLines(lineDtos)
                .build();
    }
}
