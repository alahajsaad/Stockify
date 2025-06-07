package com.alabenhajsaad.api.business.client_order.mapper;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.client_order.ClientOrderResponseDto;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
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
        Map<LineAction, List<ClientOrderLine>> lineDtos = clientOrder.getOrderLines()
                .stream()
                .collect(Collectors.groupingBy(line -> LineAction.DO_NOTHING));


        return ClientOrderResponseDto.builder()
                .id(clientOrder.getId())
                .orderNumber(clientOrder.getOrderNumber())
                .totalExcludingTax(clientOrder.getTotalExcludingTax())
                .totalIncludingTax(clientOrder.getTotalIncludingTax())
                .paymentStatus(clientOrder.getPaymentStatus())
                .deliveryStatus(clientOrder.getDeliveryStatus())
                .clientOrderLine(lineDtos)
                .build();
    }
}
