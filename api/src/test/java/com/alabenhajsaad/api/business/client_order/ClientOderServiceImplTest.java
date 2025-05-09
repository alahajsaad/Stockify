package com.alabenhajsaad.api.business.client_order;

import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClientOrderServiceImplTest {

    @Mock
    private ClientOrderRepository repository;

    @Mock
    private ProductExternalService productExternalService;

    @InjectMocks
    private ClientOrderServiceImpl clientOrderService ;

    private Product productA;
    private Product productB;
    private Product productC;
    private ClientOrder existingOrder;
    private ClientOrderLine orderLine1;
    private ClientOrderLine orderLine2;

    @BeforeEach
    void setUp() {

        // Setup test data
        productA = Product.builder()
                .id(1)
                .build();

        productB = Product.builder()
                .id(2)
                .build();

        productC = Product.builder()
                .id(3)
                .build();

        // Create order lines with reference to their order
        List<ClientOrderLine> orderLines = new ArrayList<>();

        orderLine1 = ClientOrderLine.builder()
                .id(1)
                .product(productA)
                .quantity(2)
                .unitPrice(BigDecimal.valueOf(20))
                .valueAddedTax(10.0)
                .build();

        orderLine2 = ClientOrderLine.builder()
                .id(2)
                .product(productB)
                .quantity(3)
                .unitPrice(BigDecimal.valueOf(100))
                .valueAddedTax(10.0)
                .build();

        orderLines.add(orderLine1);
        orderLines.add(orderLine2);

        // Create existing order
        existingOrder = ClientOrder.builder()
                .id(1)
                .orderNumber("ORD-001")
                .deliveryStatus(DeliveryStatus.UNDELIVERED)
                .paymentStatus(PaymentStatus.UNPAID)
                .totalExcludingTax(BigDecimal.valueOf(340))
                .totalIncludingTax(BigDecimal.valueOf(374))
                .orderLines(orderLines)
                .build();

        // Set bidirectional relationship
        orderLine1.setOrder(existingOrder);
        orderLine2.setOrder(existingOrder);
    }

    @Test
    void testUpdateClientOrder_shouldUpdateStatusAndLines() {
        // Create a new order with updated status and an additional order line
        ClientOrderLine updatedOrderLine1 = ClientOrderLine.builder()
                .id(1)
                .product(productA)
                .quantity(2)
                .unitPrice(BigDecimal.valueOf(20))
                .valueAddedTax(10.0)
                .build();

        ClientOrderLine updatedOrderLine2 = ClientOrderLine.builder()
                .id(2)
                .product(productB)
                .quantity(3)
                .unitPrice(BigDecimal.valueOf(100))
                .valueAddedTax(10.0)
                .build();

        ClientOrderLine newOrderLine = ClientOrderLine.builder()
                .product(productC)
                .quantity(3)
                .unitPrice(BigDecimal.valueOf(120))
                .valueAddedTax(10.0)
                .build();

        List<ClientOrderLine> updatedOrderLines = new ArrayList<>();
        updatedOrderLines.add(updatedOrderLine1);
        updatedOrderLines.add(updatedOrderLine2);
        updatedOrderLines.add(newOrderLine);

        ClientOrder newOrder = ClientOrder.builder()
                .id(1)
                .orderLines(updatedOrderLines)
                .deliveryStatus(DeliveryStatus.DELIVERED)
                .paymentStatus(PaymentStatus.PAID)
                .build();

        // Mock repository to return existing order
        when(repository.findById(1)).thenReturn(Optional.of(existingOrder));
        when(repository.save(any(ClientOrder.class))).thenAnswer(i -> i.getArgument(0));

        // Mock product service methods
        doNothing().when(productExternalService).updateProductQuantityAndLastSalePrice(
                eq(productC.getId()), anyInt(), any(BigDecimal.class));

        // Execute the method under test
        ClientOrder updatedOrder = clientOrderService.updateClientOrder(newOrder);

        // Verify the result
        assertEquals(PaymentStatus.PAID, updatedOrder.getPaymentStatus());
        assertEquals(DeliveryStatus.DELIVERED, updatedOrder.getDeliveryStatus());
        assertEquals(3, updatedOrder.getOrderLines().size());

        // Verify service interactions
        verify(productExternalService).updateProductQuantityAndLastSalePrice(
                eq(productC.getId()), eq(3), eq(BigDecimal.valueOf(120)));
        verify(repository).save(existingOrder);

        // Verify totals were recalculated
        // Expected: 2*20 + 3*100 + 3*120 = 40 + 300 + 360 = 700
        assertEquals(BigDecimal.valueOf(700), updatedOrder.getTotalExcludingTax());

        // Expected with 10% VAT: 700 * 1.1 = 770
        assertEquals(BigDecimal.valueOf(770).setScale(2),
                updatedOrder.getTotalIncludingTax().setScale(2));
    }

    @Test
    void testUpdateClientOrder_orderNotFound() {
        // Setup
        ClientOrder newOrder = ClientOrder.builder()
                .id(999) // Non-existent ID
                .build();

        when(repository.findById(999)).thenReturn(Optional.empty());

        // Execute and verify
        assertThrows(ResourceNotFoundException.class, () -> {
            clientOrderService.updateClientOrder(newOrder);
        });
    }

    @Test
    void testUpdateClientOrder_removeOrderLine() {
        // Setup - create new order with one line removed
        ClientOrderLine remainingLine = ClientOrderLine.builder()
                .id(1)
                .product(productA)
                .quantity(2)
                .unitPrice(BigDecimal.valueOf(20))
                .valueAddedTax(10.0)
                .build();

        List<ClientOrderLine> updatedOrderLines = new ArrayList<>();
        updatedOrderLines.add(remainingLine);

        ClientOrder newOrder = ClientOrder.builder()
                .id(1)
                .orderLines(updatedOrderLines)
                .deliveryStatus(DeliveryStatus.UNDELIVERED)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        // Mock repository
        when(repository.findById(1)).thenReturn(Optional.of(existingOrder));
        when(repository.save(any(ClientOrder.class))).thenAnswer(i -> i.getArgument(0));

        // Mock product service
        doNothing().when(productExternalService).undoUpdateProductQuantityAndLastSalePrice(
                eq(productB.getId()), eq(3));

        // Execute
        ClientOrder updatedOrder = clientOrderService.updateClientOrder(newOrder);

        // Verify
        assertEquals(1, updatedOrder.getOrderLines().size());
        verify(productExternalService).undoUpdateProductQuantityAndLastSalePrice(
                eq(productB.getId()), eq(3));

        // Verify recalculated totals
        // Expected: 2*20 = 40
        assertEquals(BigDecimal.valueOf(40), updatedOrder.getTotalExcludingTax());

        // Expected with 10% VAT: 40 * 1.1 = 44
        assertEquals(BigDecimal.valueOf(44).setScale(2),
                updatedOrder.getTotalIncludingTax().setScale(2));
    }

    @Test
    void testUpdateClientOrder_updateExistingLine() {
        // Setup - update quantity of an existing line
        ClientOrderLine updatedLine = ClientOrderLine.builder()
                .id(1)
                .product(productA)
                .quantity(5) // Changed from 2 to 5
                .unitPrice(BigDecimal.valueOf(25)) // Changed from 20 to 25
                .valueAddedTax(10.0)
                .build();

        ClientOrderLine unchangedLine = ClientOrderLine.builder()
                .id(2)
                .product(productB)
                .quantity(3)
                .unitPrice(BigDecimal.valueOf(100))
                .valueAddedTax(10.0)
                .build();

        List<ClientOrderLine> updatedOrderLines = new ArrayList<>();
        updatedOrderLines.add(updatedLine);
        updatedOrderLines.add(unchangedLine);

        ClientOrder newOrder = ClientOrder.builder()
                .id(1)
                .orderLines(updatedOrderLines)
                .deliveryStatus(DeliveryStatus.UNDELIVERED)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        // Mock repository
        when(repository.findById(1)).thenReturn(Optional.of(existingOrder));
        when(repository.save(any(ClientOrder.class))).thenAnswer(i -> i.getArgument(0));

        // Mock product service
        doNothing().when(productExternalService).updateProductQuantityAndLastSalePrice(
                eq(productA.getId()), eq(5), eq(BigDecimal.valueOf(25)));

        // Execute
        ClientOrder updatedOrder = clientOrderService.updateClientOrder(newOrder);

        // Verify
        assertEquals(2, updatedOrder.getOrderLines().size());
        verify(productExternalService).updateProductQuantityAndLastSalePrice(
                eq(productA.getId()), eq(5), eq(BigDecimal.valueOf(25)));

        // Find the updated line and check its values
        ClientOrderLine resultLine = updatedOrder.getOrderLines().stream()
                .filter(line -> line.getId().equals(1))
                .findFirst()
                .orElseThrow();

        assertEquals(5, resultLine.getQuantity());
        assertEquals(BigDecimal.valueOf(25), resultLine.getUnitPrice());

        // Verify recalculated totals
        // Expected: 5*25 + 3*100 = 125 + 300 = 425
        assertEquals(BigDecimal.valueOf(425), updatedOrder.getTotalExcludingTax());

        // Expected with 10% VAT: 425 * 1.1 = 467.5
        assertEquals(BigDecimal.valueOf(467.50).setScale(2),
                updatedOrder.getTotalIncludingTax().setScale(2));
    }

    @Test
    void testUpdateClientOrder_changeProduct() {
        // Setup - change product on an existing line
        ClientOrderLine updatedLine = ClientOrderLine.builder()
                .id(1)
                .product(productC) // Changed from productA to productC
                .quantity(2)
                .unitPrice(BigDecimal.valueOf(20))
                .valueAddedTax(10.0)
                .build();

        ClientOrderLine unchangedLine = ClientOrderLine.builder()
                .id(2)
                .product(productB)
                .quantity(3)
                .unitPrice(BigDecimal.valueOf(100))
                .valueAddedTax(10.0)
                .build();

        List<ClientOrderLine> updatedOrderLines = new ArrayList<>();
        updatedOrderLines.add(updatedLine);
        updatedOrderLines.add(unchangedLine);

        ClientOrder newOrder = ClientOrder.builder()
                .id(1)
                .orderLines(updatedOrderLines)
                .deliveryStatus(DeliveryStatus.UNDELIVERED)
                .paymentStatus(PaymentStatus.UNPAID)
                .build();

        // Mock repository
        when(repository.findById(1)).thenReturn(Optional.of(existingOrder));
        when(repository.save(any(ClientOrder.class))).thenAnswer(i -> i.getArgument(0));

        // Mock product service
        doNothing().when(productExternalService).undoUpdateProductQuantityAndLastSalePrice(
                eq(productA.getId()), eq(2));
        doNothing().when(productExternalService).updateProductQuantityAndLastSalePrice(
                eq(productC.getId()), eq(2), eq(BigDecimal.valueOf(20)));

        // Execute
        ClientOrder updatedOrder = clientOrderService.updateClientOrder(newOrder);

        // Verify
        assertEquals(2, updatedOrder.getOrderLines().size());
        verify(productExternalService).undoUpdateProductQuantityAndLastSalePrice(
                eq(productA.getId()), eq(2));
        verify(productExternalService).updateProductQuantityAndLastSalePrice(
                eq(productC.getId()), eq(2), eq(BigDecimal.valueOf(20)));

        // Find the updated line and check its product
        ClientOrderLine resultLine = updatedOrder.getOrderLines().stream()
                .filter(line -> line.getId().equals(1))
                .findFirst()
                .orElseThrow();

        assertEquals(productC.getId(), resultLine.getProduct().getId());
    }
}