package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    @PostMapping
    public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(ApiResponse.success(productService.addProduct(product),"Produit ajoutée avec succès"));
    }
}
