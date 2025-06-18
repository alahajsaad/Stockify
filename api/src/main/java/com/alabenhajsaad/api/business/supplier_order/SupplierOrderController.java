package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.business.client_order.dto.ClientOrderStatistics;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderDto;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderResponseDto;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderStatistics;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
import com.alabenhajsaad.api.config.ApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("api/v1/supplierOrder")
//@PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN', 'SCOPE_ROLE_EMPLOYEE')")
public class SupplierOrderController {

    private final SupplierOrderService service;
    public SupplierOrderController(SupplierOrderService service) {
        this.service = service;
    }

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
                "Commande fournisseur mise à jour avec succès."
        ));
    }


    @GetMapping()
    public ResponseEntity<Page<SupplierOrderResponseDto>> getSupplierOrderById(
            @RequestParam(required = false) LocalDate fromDate,
            @RequestParam(required = false) LocalDate toDate,
            @RequestParam(required = false) ReceptionStatus receptionStatus,
            @RequestParam(required = false) PaymentStatus paymentStatus,
            @RequestParam(required = false) String keyword ,
            @RequestParam(required = false) Integer partnerId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {
        return ResponseEntity.ok(
                service.getSupplierOrders(PageRequest.of(page, size) ,fromDate, toDate, receptionStatus,paymentStatus,keyword ,partnerId)
        );
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
        return ResponseEntity.ok(ApiResponse.success(service.getNewSupplierOrderNumber(),"new order number"
        ));
    }

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<SupplierOrderStatistics>> getSupplierOrderStatistics() {
        return ResponseEntity.ok(ApiResponse.success(service.getSupplierOrderStatistics(),"Statistiques générées avec succès."));
    }
}
