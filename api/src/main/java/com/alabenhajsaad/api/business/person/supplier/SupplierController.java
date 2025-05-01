package com.alabenhajsaad.api.business.person.supplier;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/supplier")
public class SupplierController {

    private final SupplierService service;

    @PostMapping()
    public ResponseEntity<ApiResponse<Supplier>> addSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(ApiResponse.success(service.save(supplier), "Fournisseur ajouté avec succès."));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<Page<Supplier>>> getAll(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success(service.findAll(pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Supplier>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(service.findById(id)));
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<Supplier>> updateSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(ApiResponse.success(service.update(supplier), "Fournisseur mis à jour avec succès."));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Supplier>>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(ApiResponse.success(service.searchByPhoneNumberOrName(keyword)));
    }
}
