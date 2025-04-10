package com.alabenhajsaad.api.business.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repository;

    @Override
    public Product AddProduct(Product product) {
        return repository.save(product);
    }
}
