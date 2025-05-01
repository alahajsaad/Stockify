package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.product.dto.ProductFilter;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);
    Page<Product> getFiltredProducts(ProductFilter productFilter);
    Product getProductById(Integer id);
    Product updateProduct(Product product);
}
