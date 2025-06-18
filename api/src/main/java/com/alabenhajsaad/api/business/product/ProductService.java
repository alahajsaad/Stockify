package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.product.dto.ProductStatistics;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<Product> addMultipleProducts(List<Product> products);
    Product addProduct(Product product);
    Page<Product> getProducts(StockStatus status,String keyword, Pageable pageable);
    Product getProductById(Integer id);
    Product updateProduct(Product product);
    ProductStatistics getProductStatistics();
}
