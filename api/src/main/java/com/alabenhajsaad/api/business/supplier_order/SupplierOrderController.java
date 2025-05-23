package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderDto;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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
    @PutMapping
    public ResponseEntity<ApiResponse<SupplierOrder>> updateSupplierOrder(@RequestBody SupplierOrderDto supplierOrderDto) {
        return ResponseEntity.ok(ApiResponse.success(
                service.updateSupplierOrder(supplierOrderDto),
                "Commande fournisseur ajoutée avec succès."
        ));
    }


    @GetMapping()
    public ResponseEntity<ApiResponse<Page<SupplierOrder>>> getSupplierOrderById(
            @RequestParam(required = false) LocalDate fromDate,
            @RequestParam(required = false) LocalDate toDate,
            @RequestParam(required = false) ReceptionStatus receptionStatus,
            @RequestParam(required = false) PaymentStatus paymentStatus,
            @RequestParam(required = false) String keyword ,
            @RequestParam(required = false) Integer clientId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                service.getSupplierOrders(PageRequest.of(page, size) ,fromDate, toDate, receptionStatus,paymentStatus,keyword ,clientId),
                "Commande fournisseur récupérée avec succès."
        ));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SupplierOrderDto>> getSupplierOrderById(@PathVariable Integer id) {
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
