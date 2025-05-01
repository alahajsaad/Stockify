package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/supplierOrder")
public class SupplierOrderController {

    private final SupplierOrderService service;

    @PostMapping
    public ResponseEntity<ApiResponse<SupplierOrder>> addSupplierOrder(@RequestBody SupplierOrder order) {
        return ResponseEntity.ok(ApiResponse.success(
                service.saveSupplierOrder(order),
                "Commande fournisseur ajoutée avec succès."
        ));
    }

    @PatchMapping("/{id}/receive")
    public ResponseEntity<ApiResponse<Void>> setOrderAsReceived(@PathVariable Integer id) {
        service.setSupplierOrderAsRecived(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Commande fournisseur marquée comme reçue."));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SupplierOrder>> getSupplierOrderById(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(
                service.getSupplierOrderById(id),
                "Commande fournisseur récupérée avec succès."
        ));
    }

    @GetMapping("/generate-number")
    public ResponseEntity<ApiResponse<String>> getNewOrderNumber() {
        return ResponseEntity.ok(ApiResponse.success(
                service.getNewSupplierOrderNumber(),
                "Numéro de commande généré avec succès."
        ));
    }
}
