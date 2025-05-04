package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.product.dto.ProductFilter;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    @PostMapping("/multi")
    public ResponseEntity<ApiResponse<List<Product>>> addProduct(@RequestBody List<Product> products) {
        return ResponseEntity.ok(ApiResponse.success(productService.addMultipleProducts(products),"Produits ajoutée avec succès"));
    }
    @PostMapping
    public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(ApiResponse.success(productService.addProduct(product),"Produit ajoutée avec succès"));
    }
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Product>>> getFiltredProducts(
            @RequestBody(required = false) ProductFilter productFilter,
            @RequestParam(defaultValue = "0") Integer page, // Default to 0 (first page)
            @RequestParam(defaultValue = "10") Integer size // Default to 10 (size)
    ) {
        // If productFilter is null, use default values
        if (productFilter == null) {
            productFilter = new ProductFilter(null, null, null); // You can set default values here if needed
        }

        return ResponseEntity.ok(ApiResponse.success(
                productService.getFiltredProducts(productFilter, PageRequest.of(page, size))
        ));
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getFiltredProducts(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductById(id)));
    }
    @PutMapping
    public ResponseEntity<ApiResponse<Product>> updateProduct(@RequestBody Product product) {
        return ResponseEntity.ok(ApiResponse.success(productService.updateProduct(product),"Produit modifier avec sucess"));
    }
}
