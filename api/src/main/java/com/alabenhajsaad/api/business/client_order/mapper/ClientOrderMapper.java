package com.alabenhajsaad.api.business.client_order.mapper;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.client_order.dto.ClientOrderDto;

public interface ClientOrderMapper {
    ClientOrderDto toClientOrderResponseDto(ClientOrder clientOrder);
}
