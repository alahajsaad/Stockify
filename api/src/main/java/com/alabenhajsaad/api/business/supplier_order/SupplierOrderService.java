package com.alabenhajsaad.api.business.supplier_order;


import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface SupplierOrderService {
    SupplierOrder saveSupplierOrder(SupplierOrder supplierOrder);
    SupplierOrder updateSupplierOrder(SupplierOrder supplierOrder);
    Page<SupplierOrder> getSupplierOrders(Pageable pageable, LocalDate fromDate , LocalDate toDate , ReceptionStatus receptionStatus , PaymentStatus paymentStatus, String keyWord);

    SupplierOrder getSupplierOrderById(Integer supplierOrderId);
    String getNewSupplierOrderNumber();
}
