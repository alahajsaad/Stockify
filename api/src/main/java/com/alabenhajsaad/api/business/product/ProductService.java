package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.product.dto.ProductFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<Product> addMultipleProducts(List<Product> products);
    Product addProduct(Product product);
    Page<Product> getFiltredProducts(ProductFilter productFilter , Pageable pageable);
    Product getProductById(Integer id);
    Product updateProduct(Product product);
}
