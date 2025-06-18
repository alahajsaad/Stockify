package com.alabenhajsaad.api.business.supplier_order;


import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderDto;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderResponseDto;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderStatistics;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface SupplierOrderService {
    SupplierOrder saveSupplierOrder(SupplierOrder supplierOrder);
    SupplierOrder updateSupplierOrder(SupplierOrderDto supplierOrder);
    Page<SupplierOrderResponseDto> getSupplierOrders(Pageable pageable, LocalDate fromDate , LocalDate toDate , ReceptionStatus receptionStatus , PaymentStatus paymentStatus, String keyword , Integer supplierId);

    SupplierOrderDto getSupplierOrderById(Integer supplierOrderId);
    String getNewSupplierOrderNumber();
    SupplierOrderStatistics getSupplierOrderStatistics();
}
