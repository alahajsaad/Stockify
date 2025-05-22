package com.alabenhajsaad.api.business.client_order;


import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.business.utils.CodeGeneratorService;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientOrderServiceImpl implements ClientOrderService{
    private final ClientOrderRepository repository;
    private final ProductExternalService productExternalService;
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
    public ClientOrder updateClientOrder(ClientOrder clientOrder) {
        ClientOrder oldClientOrder = getClientOrderById(clientOrder.getId());

        updateOrderStatus(clientOrder, oldClientOrder);
        updateOrderLines(clientOrder, oldClientOrder);
        recalculateTotals(oldClientOrder);

        return repository.save(oldClientOrder);
    }

    private void updateOrderStatus(ClientOrder newOrder, ClientOrder oldOrder) {
        if (newOrder.getPaymentStatus() != oldOrder.getPaymentStatus()) {
            oldOrder.setPaymentStatus(newOrder.getPaymentStatus());
        }
        if (newOrder.getDeliveryStatus() != oldOrder.getDeliveryStatus()) {
            oldOrder.setDeliveryStatus(newOrder.getDeliveryStatus());
        }
    }

    private void updateOrderLines(ClientOrder newOrder, ClientOrder oldOrder) {
        List<ClientOrderLine> newLines = newOrder.getOrderLines();
        List<ClientOrderLine> oldLines = oldOrder.getOrderLines();

        Set<Integer> newLineIds = newLines.stream()
                .filter(line -> line.getId() != null)
                .map(ClientOrderLine::getId)
                .collect(Collectors.toSet());

        // Supprimer les lignes supprimées
        oldLines.removeIf(oldLine -> {
            boolean toRemove = oldLine.getId() != null && !newLineIds.contains(oldLine.getId());
            if (toRemove) {
                oldLine.setOrder(null);
                productExternalService.undoUpdateProductQuantityAndLastSalePrice(
                        oldLine.getProduct().getId(), oldLine.getQuantity());
            }
            return toRemove;
        });

        // Ajouter ou mettre à jour les lignes
        for (ClientOrderLine newLine : newLines) {
            newLine.setOrder(oldOrder);

            if (newLine.getId() == null) {
                // nouvelle ligne
                oldLines.add(newLine);
                productExternalService.updateProductQuantityAndLastSalePrice(
                        newLine.getProduct().getId(),
                        newLine.getQuantity(),
                        newLine.getUnitPrice());
            } else {
                // mise à jour
                oldLines.stream()
                        .filter(oldLine -> oldLine.getId().equals(newLine.getId()))
                        .findFirst()
                        .ifPresent(oldLine -> updateLine(oldLine, newLine));
            }
        }
    }

    private void updateLine(ClientOrderLine oldLine, ClientOrderLine newLine) {
        if (!oldLine.getProduct().getId().equals(newLine.getProduct().getId())) {
            // produit changé : on annule l'effet précédent et on applique le nouveau
            productExternalService.undoUpdateProductQuantityAndLastSalePrice(
                    oldLine.getProduct().getId(), oldLine.getQuantity());

            productExternalService.updateProductQuantityAndLastSalePrice(
                    newLine.getProduct().getId(), newLine.getQuantity(), newLine.getUnitPrice());

            oldLine.setProduct(newLine.getProduct());
            oldLine.setQuantity(newLine.getQuantity());
            oldLine.setUnitPrice(newLine.getUnitPrice());
        } else if (!oldLine.getQuantity().equals(newLine.getQuantity())
                || !oldLine.getUnitPrice().equals(newLine.getUnitPrice())) {
            // même produit mais quantité/prix changé
            productExternalService.updateProductQuantityAndLastSalePrice(
                    newLine.getProduct().getId(), newLine.getQuantity(), newLine.getUnitPrice());

            oldLine.setQuantity(newLine.getQuantity());
            oldLine.setUnitPrice(newLine.getUnitPrice());
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
    public ClientOrder getClientOrderById(Integer supplierOrderId) {
        return repository.findById(supplierOrderId).orElseThrow(
                () -> new ResourceNotFoundException("commande client n'est pas trouvee !")
        );
    }

    @Override
    public String getNewClientOrderNumber() {
        return CodeGeneratorService.generateNew(repository.findLastOrderNumber(),"CMF") ;

    }
}
