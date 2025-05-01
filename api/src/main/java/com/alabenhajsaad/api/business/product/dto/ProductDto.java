package com.alabenhajsaad.api.business.product.dto;

import lombok.Builder;

@Builder
public record ProductDto(
       String designation,
       String reference,
       Integer categoryId,
       Integer vatId,
       Integer criticalThreshold

) {
}
