package com.alabenhajsaad.api.business.supplier_order;

public interface SupplierOrderService {
    SupplierOrder saveSupplierOrder(SupplierOrder supplierOrder);
    void setSupplierOrderAsRecived(Integer supplierOrderId);
    SupplierOrder getSupplierOrderById(Integer supplierOrderId);
    String getNewSupplierOrderNumber();
}
