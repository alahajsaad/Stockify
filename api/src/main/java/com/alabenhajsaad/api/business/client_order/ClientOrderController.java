package com.alabenhajsaad.api.business.client_order;

import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.product.StockStatus;
import com.alabenhajsaad.api.business.supplier_order.SupplierOrder;
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
@RequestMapping("api/v1/client/order")
public class ClientOrderController {
    private final ClientOrderService clientOrderService;

    @PostMapping
    public ResponseEntity<ApiResponse<ClientOrder>> addSupplierOrder(@RequestBody ClientOrder order) {
        return ResponseEntity.ok(ApiResponse.success(
                clientOrderService.saveClientOrder(order),
                "Commande client ajoutée avec succès."
        ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ClientOrder>>> getClientOrder(
            @RequestParam(required = false) LocalDate fromDate,
            @RequestParam(required = false) LocalDate toDate,
            @RequestParam(required = false) DeliveryStatus deliveryStatus,
            @RequestParam(required = false) PaymentStatus paymentStatus,
            @RequestParam(required = false) String keyWord ,
            @RequestParam(required = false) Integer clientId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {

        return ResponseEntity.ok(ApiResponse.success(
                clientOrderService.getClientOrders(PageRequest.of(page, size) ,fromDate, toDate, deliveryStatus,paymentStatus,keyWord ,clientId)
        ));
    }
}
