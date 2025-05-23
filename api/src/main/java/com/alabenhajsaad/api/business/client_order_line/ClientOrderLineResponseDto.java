package com.alabenhajsaad.api.business.client_order_line;

import com.alabenhajsaad.api.business.utils.LineAction;
import lombok.Builder;

import java.util.Map;
@Builder
public record ClientOrderLineResponseDto(
        Map<LineAction,ClientOrderLine> clientOrderLine
) {
}
