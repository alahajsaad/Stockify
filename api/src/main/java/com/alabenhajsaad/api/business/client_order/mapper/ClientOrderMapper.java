package com.alabenhajsaad.api.business.client_order.mapper;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.client_order.ClientOrderResponseDto;

public interface ClientOrderMapper {
    ClientOrderResponseDto toClientOrderResponseDto(ClientOrder clientOrder);
}
