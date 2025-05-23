package com.alabenhajsaad.api.business.supplier_order.mapper;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.client_order.ClientOrderResponseDto;
import com.alabenhajsaad.api.business.supplier_order.SupplierOrder;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderDto;

public interface SupplierOrderMapper {
    SupplierOrderDto toSupplierOrderDto(SupplierOrder supplierOrder);
}
