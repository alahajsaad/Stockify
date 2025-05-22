package com.alabenhajsaad.api.business.category;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;
    @PostMapping("/multi")
    public ResponseEntity<ApiResponse<List<Category>>> createCategory(@RequestBody List<Category> categories) {
        return ResponseEntity.ok(
                ApiResponse.success(service.addMultipleCategories(categories), "Catégorie ajoutée avec succès")
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Category>> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(
                ApiResponse.success(service.addCategory(category), "Catégorie ajoutée avec succès")
        );
    }


    @PutMapping
    public ResponseEntity<ApiResponse<Category>> updateCategory(@RequestBody Category category) {
        return ResponseEntity.ok(
                ApiResponse.success(service.updateCategory(category), "Catégorie mise à jour avec succès")
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Category>>> getCategories(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(service.getCategories(PageRequest.of(page, size),keyword), "Liste des catégories récupérée avec succès")
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategoryById(@PathVariable int id) {
        return ResponseEntity.ok(
                ApiResponse.success(service.getCategoryById(id), "Catégorie récupérée avec succès")
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategoryById(@PathVariable int id) {
        service.deleteCategoryById(id);
        return ResponseEntity.ok(
                ApiResponse.success(null, "Catégorie supprimée avec succès")
        );
    }
}
