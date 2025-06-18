package com.alabenhajsaad.api.business.vat;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/vat")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")

public class VatController {
    private final VatService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Vat>> createVat(@RequestBody Vat vat) {
        return ResponseEntity.ok(
                ApiResponse.success(service.addVat(vat), "Valeur de taxe ajoutée avec succès")
        );
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Vat>> updateVat(@RequestBody Vat vat) {
        return ResponseEntity.ok(
                ApiResponse.success(service.updateVat(vat), "Taxe mise à jour avec succès")
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Vat>> getVatById(@PathVariable int id) {
        return ResponseEntity.ok(
                ApiResponse.success(service.getVatById(id), "Taxe récupérée avec succès")
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Vat>>> getAllVats() {
        return ResponseEntity.ok(
                ApiResponse.success(service.getAllVats(), "Liste des taxes récupérée avec succès")
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVat(@PathVariable int id) {
        service.deleteVat(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Taxe supprimée avec succès"));
    }
}
