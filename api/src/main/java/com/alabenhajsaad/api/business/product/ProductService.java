package com.alabenhajsaad.api.business.product;

import java.util.List;

public interface ProductService {
    Product AddProduct(Product product);
    List<Product> SearchProduct(String SearchWord);
}
