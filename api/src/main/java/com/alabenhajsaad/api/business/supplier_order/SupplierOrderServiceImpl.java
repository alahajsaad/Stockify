package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.client_order.ClientOrderSpecification;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLine;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLineRepository;
import com.alabenhajsaad.api.business.utils.CodeGeneratorService;
import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
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
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierOrderServiceImpl implements SupplierOrderService{
    private final SupplierOrderRepository repository;
    private final ProductExternalService productService ;
    private final ProductExternalService productExternalService ;
    private final SupplierOrderLineRepository lineRepository;

    @Override
    public SupplierOrder saveSupplierOrder(SupplierOrder supplierOrder) {
        supplierOrder.setPaymentStatus(PaymentStatus.UNPAID);
        supplierOrder.setReceptionStatus(ReceptionStatus.UNRECEIVED);

        BigDecimal totalExcludingTax = BigDecimal.ZERO;
        BigDecimal totalIncludingTax = BigDecimal.ZERO;

        for (SupplierOrderLine orderLine : supplierOrder.getOrderLines()) {
            totalExcludingTax = totalExcludingTax.add(orderLine.getTotalExcludingTax());
            totalIncludingTax = totalIncludingTax.add(orderLine.getTotalIncludingTax());
        }

        supplierOrder.setTotalExcludingTax(totalExcludingTax);
        supplierOrder.setTotalIncludingTax(totalIncludingTax);

        return repository.save(supplierOrder);
    }

    @Override
    public SupplierOrder updateSupplierOrder(SupplierOrder supplierOrder) {
        SupplierOrder oldSupplierOrder = getSupplierOrderById(supplierOrder.getId());

        updateOrderLines(supplierOrder, oldSupplierOrder);
        updateOrderStatus(supplierOrder,oldSupplierOrder) ;
        recalculateTotals(oldSupplierOrder);

        return null;
    }

    private void updateOrderStatus(SupplierOrder newOrder, SupplierOrder oldOrder) {
        if (newOrder.getPaymentStatus() != oldOrder.getPaymentStatus()) {
            oldOrder.setPaymentStatus(newOrder.getPaymentStatus());
        }
        if (newOrder.getReceptionStatus() != oldOrder.getReceptionStatus()) {
            oldOrder.setReceptionStatus(newOrder.getReceptionStatus());
            for (SupplierOrderLine orderLine : newOrder.getOrderLines()) {
                productExternalService.updateProductQuantityAndLastPurchasePrice(
                        orderLine.getProduct().getId(),
                        orderLine.getQuantity(),
                        orderLine.getUnitPrice());
            }
        }
    }

    private void updateOrderLines(SupplierOrder newOrder, SupplierOrder oldOrder) {
        List<SupplierOrderLine> newLines = newOrder.getOrderLines();
        List<SupplierOrderLine> oldLines = oldOrder.getOrderLines();

        Set<Integer> newLineIds = newLines.stream()
                .map(SupplierOrderLine::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        // Supprimer les lignes supprimées
        oldLines.removeIf(oldLine -> {
            boolean toRemove = oldLine.getId() != null && !newLineIds.contains(oldLine.getId());
            if (toRemove) {
                if(oldOrder.getReceptionStatus() == ReceptionStatus.RECEIVED) {
                    productExternalService.undoUpdateProductQuantityAndLastSalePrice(
                            oldLine.getProduct().getId(), oldLine.getQuantity());
                }
                lineRepository.deleteById(oldOrder.getId());
            }
            return toRemove;
        });

        // Ajouter ou mettre à jour les lignes
        for (SupplierOrderLine newLine : newLines) {
            newLine.setOrder(oldOrder);

            if (newLine.getId() == null) {
                // nouvelle ligne
                oldLines.add(newLine);
            } else {
                // mise à jour
                oldLines.stream()
                        .filter(oldLine -> oldLine.getId().equals(newLine.getId()))
                        .findFirst()
                        .ifPresent(oldLine -> updateLine(oldLine, newLine));
            }
        }
    }

    private void updateLine(SupplierOrderLine oldLine, SupplierOrderLine newLine) {
            oldLine.setProduct(newLine.getProduct());
            oldLine.setQuantity(newLine.getQuantity());
            oldLine.setUnitPrice(newLine.getUnitPrice());
            oldLine.setValueAddedTax(newLine.getValueAddedTax());
    }


    private void recalculateTotals(SupplierOrder order) {
        BigDecimal totalExcl = BigDecimal.ZERO;
        BigDecimal totalIncl = BigDecimal.ZERO;

        for (SupplierOrderLine line : order.getOrderLines()) {
            totalExcl = totalExcl.add(line.getTotalExcludingTax());
            totalIncl = totalIncl.add(line.getTotalIncludingTax());
        }

        order.setTotalExcludingTax(totalExcl);
        order.setTotalIncludingTax(totalIncl);
    }

    @Override
    public Page<SupplierOrder> getSupplierOrders(Pageable pageable, LocalDate fromDate, LocalDate toDate, ReceptionStatus receptionStatus, PaymentStatus paymentStatus, String keyWord) {
        Specification<SupplierOrder> specification = Specification
                .where(SupplierOrderSpecification.hasDate(fromDate,toDate))
                .and(SupplierOrderSpecification.hasKeyWord(keyWord))
                .and(SupplierOrderSpecification.hasReceptionStatus(receptionStatus))
                .and(SupplierOrderSpecification.hasPaymentStatus(paymentStatus)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return repository.findAll(specification, pageable);
    }


    @Override
    public SupplierOrder getSupplierOrderById(Integer supplierOrderId) {
        return repository.findById(supplierOrderId)
                .orElseThrow(() -> new ResourceNotFoundException("Cette commande fournisseur n'a pas été trouvée."));
    }

    @Override
    public String getNewSupplierOrderNumber() {
        return CodeGeneratorService.generateNew(repository.findLastOrderNumber(),"CMF") ;
    }


}
