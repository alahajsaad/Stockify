package com.alabenhajsaad.api.business.client_order;

import com.alabenhajsaad.api.business.client_order.dto.ClientOrderDto;
import com.alabenhajsaad.api.business.client_order.dto.ClientOrderResponseDto;
import com.alabenhajsaad.api.business.client_order.dto.ClientOrderStatistics;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface ClientOrderService {
    ClientOrder saveClientOrder(ClientOrder clientOrder);
    ClientOrder updateClientOrder(ClientOrderDto clientOrder);
    Page<ClientOrderResponseDto> getClientOrders(Pageable pageable, LocalDate fromDate , LocalDate toDate , DeliveryStatus deliveryStatus , PaymentStatus paymentStatus, String keyWord , Integer clientId);
    ClientOrderDto getClientOrderById(Integer clientOrderId);
    String getNewClientOrderNumber();
    ClientOrderStatistics getClientOrderStatistics();
}
