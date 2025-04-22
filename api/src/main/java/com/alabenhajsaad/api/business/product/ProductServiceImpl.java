package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.core.exception.ConflictException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repository;

    @Override
    public Product AddProduct(Product product) {
        if(repository.existsByDesignation(product.getDesignation()) || repository.existsByReference(product.getReference())){
            throw new ConflictException("Ce produit existe déjà");
        }
        product.setProductStatus(ProductStatus.OUT_OF_STOCK);
        return repository.save(product);
    }

    @Override
    public List<Product> SearchProduct(String SearchWord) {
        // todo - specification api
        return List.of();
    }
}
