package com.alabenhajsaad.api.business.client_order;


import com.alabenhajsaad.api.business.client_order.mapper.ClientOrderMapper;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLineResponseDto;
import com.alabenhajsaad.api.business.utils.LineAction;
import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.business.utils.CodeGeneratorService;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;
import java.util.Objects;


@Service
@RequiredArgsConstructor
@Slf4j
public class ClientOrderServiceImpl implements ClientOrderService{
    private final ClientOrderRepository repository;
    private final ProductExternalService productExternalService;
    private final ClientOrderMapper mapper ;
    @Override
    public ClientOrder saveClientOrder(ClientOrder clientOrder) {

        clientOrder.setPaymentStatus(PaymentStatus.UNPAID);
        clientOrder.setDeliveryStatus(DeliveryStatus.UNDELIVERED);

        BigDecimal totalExcludingTax = BigDecimal.ZERO;
        BigDecimal totalIncludingTax = BigDecimal.ZERO;

        for (ClientOrderLine orderLine : clientOrder.getOrderLines()) {
            productExternalService.updateProductQuantityAndLastSalePrice(
                    orderLine.getProduct().getId(),
                    orderLine.getQuantity(),
                    orderLine.getUnitPrice());

            orderLine.setOrder(clientOrder); // pour lier la commande à la ligne

            totalExcludingTax = totalExcludingTax.add(orderLine.getTotalExcludingTax());
            totalIncludingTax = totalIncludingTax.add(orderLine.getTotalIncludingTax());
        }

        clientOrder.setTotalExcludingTax(totalExcludingTax);
        clientOrder.setTotalIncludingTax(totalIncludingTax);

        return repository.save(clientOrder);
    }



    @Override
    @Transactional
    public ClientOrder updateClientOrder(ClientOrderResponseDto clientOrder) {
        ClientOrder oldClientOrder = repository.findById(clientOrder.id()).orElseThrow(
                () -> new ResourceNotFoundException("commande client n'est pas trouvee !")
        );

        updateOrderStatus(clientOrder, oldClientOrder);
        updateOrderLines(clientOrder, oldClientOrder);
        recalculateTotals(oldClientOrder);

        return repository.save(oldClientOrder);
    }

    private void updateOrderStatus(ClientOrderResponseDto newOrder, ClientOrder oldOrder) {
        if (newOrder.paymentStatus() != oldOrder.getPaymentStatus()) {
            oldOrder.setPaymentStatus(newOrder.paymentStatus());
        }
        if (newOrder.deliveryStatus() != oldOrder.getDeliveryStatus()) {
            oldOrder.setDeliveryStatus(newOrder.deliveryStatus());
        }
    }

    private void updateOrderLines(ClientOrderResponseDto updatedOrder, ClientOrder oldOrder) {
        for (ClientOrderLineResponseDto orderLineDto : updatedOrder.orderLines()) {
            for (Map.Entry<LineAction, ClientOrderLine> entry : orderLineDto.clientOrderLine().entrySet()) {
                LineAction action = entry.getKey();
                ClientOrderLine line = entry.getValue();

                switch (action) {
                    case DO_NOTHING -> {
                        // Nothing to do
                    }
                    case DO_REMOVE -> {
                        productExternalService.undoUpdateProductQuantityAndLastSalePrice(
                                line.getProduct().getId(), line.getQuantity());
                        oldOrder.getOrderLines().removeIf(l -> Objects.equals(l.getId(), line.getId()));
                    }
                    case DO_SAVE -> {
                        line.setOrder(oldOrder);
                        oldOrder.getOrderLines().add(line);
                        productExternalService.updateProductQuantityAndLastPurchasePrice(
                                line.getProduct().getId(), line.getQuantity(), line.getUnitPrice());
                    }
                    case DO_UPDATE -> {
                        ClientOrderLine oldLine = oldOrder.getOrderLines().stream()
                                .filter(l -> Objects.equals(l.getId(), line.getId()))
                                .findFirst()
                                .orElse(null);
                        if (oldLine == null) continue; // or log an error

                        if (!oldLine.getProduct().equals(line.getProduct())) {
                            oldLine.setProduct(line.getProduct());
                        }

                        if (!oldLine.getQuantity().equals(line.getQuantity()) || !oldLine.getUnitPrice().equals(line.getUnitPrice())) {
                            int delta = line.getQuantity() - oldLine.getQuantity();
                            oldLine.setQuantity(line.getQuantity());
                            oldLine.setUnitPrice(line.getUnitPrice());
                            productExternalService.updateProductQuantityAndLastSalePrice(delta,line.getQuantity(), line.getUnitPrice());
                        }


                    }
                }
            }
        }
    }

    private void recalculateTotals(ClientOrder order) {
        BigDecimal totalExcl = BigDecimal.ZERO;
        BigDecimal totalIncl = BigDecimal.ZERO;

        for (ClientOrderLine line : order.getOrderLines()) {
            totalExcl = totalExcl.add(line.getTotalExcludingTax());
            totalIncl = totalIncl.add(line.getTotalIncludingTax());
        }

        order.setTotalExcludingTax(totalExcl);
        order.setTotalIncludingTax(totalIncl);
    }


    @Override
    public Page<ClientOrder> getClientOrders(Pageable pageable, LocalDate fromDate ,LocalDate toDate ,DeliveryStatus deliveryStatus , PaymentStatus paymentStatus,String keyWord,Integer clientId) {
        Specification<ClientOrder> specification = Specification
                .where(ClientOrderSpecification.hasDate(fromDate,toDate))
                .and(ClientOrderSpecification.hasKeyWord(keyWord))
                .and(ClientOrderSpecification.hasClientId(clientId))
                .and(ClientOrderSpecification.hasDeliveryStatus(deliveryStatus))
                .and(ClientOrderSpecification.hasPaymentStatus(paymentStatus)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return repository.findAll(specification, pageable);
    }

    @Override
    public ClientOrderResponseDto getClientOrderById(Integer supplierOrderId) {
        ClientOrder clientOrder = repository.findById(supplierOrderId).orElseThrow(
                () -> new ResourceNotFoundException("commande client n'est pas trouvee !")
        );
        return mapper.toClientOrderResponseDto(clientOrder) ;
    }

    @Override
    public String getNewClientOrderNumber() {
        return CodeGeneratorService.generateNew(repository.findLastOrderNumber(),"CMC") ;

    }
}
