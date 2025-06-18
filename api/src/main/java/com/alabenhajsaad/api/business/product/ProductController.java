package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.product.dto.ProductStatistics;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/product")
@RequiredArgsConstructor

public class ProductController {
    private final ProductService productService;

    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/multi")
    public ResponseEntity<ApiResponse<List<Product>>> addProducts(@RequestBody List<Product> products) {
        return ResponseEntity.ok(ApiResponse.success(productService.addMultipleProducts(products),"Produits ajoutée avec succès"));
    }
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(ApiResponse.success(productService.addProduct(product),"Produit ajoutée avec succès"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Product>>> getProducts(
            @RequestParam(required = false) StockStatus status,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                productService.getProducts(status, keyword, PageRequest.of(page, size))
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductById(id)));
    }

    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    @PutMapping
    public ResponseEntity<ApiResponse<Product>> updateProduct(@RequestBody Product product) {
        return ResponseEntity.ok(ApiResponse.success(productService.updateProduct(product),"Produit modifier avec sucess"));
    }

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<ProductStatistics>> getProductStatistics() {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductStatistics()));
    }



}
