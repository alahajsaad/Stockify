package com.alabenhajsaad.api.business.product.mapper;

import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.product.dto.ProductDto;
import org.springframework.stereotype.Service;

@Service
public class ProductMapperImpl implements ProductMapper{
    @Override
    public Product toProduct(ProductDto dto) {
        return Product.builder()
                .designation(dto.designation())
                .reference(dto.reference())

                .build();
    }
}
