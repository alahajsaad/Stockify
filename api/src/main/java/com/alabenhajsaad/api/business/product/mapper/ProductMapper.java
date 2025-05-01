package com.alabenhajsaad.api.business.product.mapper;

import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.product.dto.ProductDto;

public interface ProductMapper {
    Product toProduct(ProductDto dto);
}
