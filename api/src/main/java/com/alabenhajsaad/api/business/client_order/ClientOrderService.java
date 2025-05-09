package com.alabenhajsaad.api.business.client_order;

import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface ClientOrderService {
    ClientOrder saveClientOrder(ClientOrder clientOrder);
    ClientOrder updateClientOrder(ClientOrder clientOrder);
    Page<ClientOrder> getClientOrders(Pageable pageable, LocalDate fromDate , LocalDate toDate , DeliveryStatus deliveryStatus , PaymentStatus paymentStatus, String keyWord);
    ClientOrder getClientOrderById(Integer supplierOrderId);
    String getNewClientOrderNumber();
}
