package com.alabenhajsaad.api.business.client_order;


import com.alabenhajsaad.api.business.client_order.dto.ClientOrderDto;
import com.alabenhajsaad.api.business.client_order.dto.ClientOrderResponseDto;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/clientOrder")
public class ClientOrderController {
    private final ClientOrderService clientOrderService;

    @PostMapping
    public ResponseEntity<ApiResponse<ClientOrder>> addClientOrder(@RequestBody ClientOrder order) {
        return ResponseEntity.ok(ApiResponse.success(
                clientOrderService.saveClientOrder(order),
                "Commande client ajoutée avec succès."
        ));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ClientOrder>> updateSupplierOrder(@RequestBody ClientOrderDto clientOrderDto) {
        return ResponseEntity.ok(ApiResponse.success(
                clientOrderService.updateClientOrder(clientOrderDto),
                "Commande client mise à jour avec succès."
        ));
    }

    @GetMapping
    public ResponseEntity<Page<ClientOrderResponseDto>> getClientOrder(
            @RequestParam(required = false) LocalDate fromDate,
            @RequestParam(required = false) LocalDate toDate,
            @RequestParam(required = false) DeliveryStatus deliveryStatus,
            @RequestParam(required = false) PaymentStatus paymentStatus,
            @RequestParam(required = false) String keyword ,
            @RequestParam(required = false) Integer clientId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {

        return ResponseEntity.ok(
                clientOrderService.getClientOrders(PageRequest.of(page, size) ,fromDate, toDate, deliveryStatus,paymentStatus,keyword ,clientId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ClientOrderDto>> getClientOrderById(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(
                clientOrderService.getClientOrderById(id),
                "Commande client récupérée avec succès."
        ));
    }

    @GetMapping("/generate-number")
    public ResponseEntity<ApiResponse<String>> getNewOrderNumber() {
        return ResponseEntity.ok(ApiResponse.success(clientOrderService.getNewClientOrderNumber(),"new order number"
        ));
    }
}
