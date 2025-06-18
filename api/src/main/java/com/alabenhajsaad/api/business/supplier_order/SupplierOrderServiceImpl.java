package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderDto;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderResponseDto;
import com.alabenhajsaad.api.business.supplier_order.dto.SupplierOrderStatistics;
import com.alabenhajsaad.api.business.supplier_order.mapper.SupplierOrderMapper;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLine;
import com.alabenhajsaad.api.business.utils.CodeGeneratorService;
import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.business.utils.LineAction;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
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
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupplierOrderServiceImpl implements SupplierOrderService{
    private final SupplierOrderRepository repository;
    private final ProductExternalService productExternalService ;
    private final SupplierOrderMapper mapper ;

    @Override
    @Transactional
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
    @Transactional
    public SupplierOrder updateSupplierOrder(SupplierOrderDto supplierOrder) {
        SupplierOrder oldSupplierOrder = repository.findById(supplierOrder.id()).orElseThrow(
                () -> new ResourceNotFoundException("Cette commande fournisseur n'a pas été trouvée ")
        );

        updateOrderLines(supplierOrder, oldSupplierOrder);
        updateOrderStatus(supplierOrder,oldSupplierOrder) ;
        recalculateTotals(oldSupplierOrder);
        return repository.save(oldSupplierOrder) ;
    }




    private void updateOrderLines(SupplierOrderDto updatedOrder, SupplierOrder oldOrder) {
            for (Map.Entry<LineAction, List<SupplierOrderLine>> entry : updatedOrder.supplierOrderLine().entrySet()) {
                LineAction action = entry.getKey();
                List<SupplierOrderLine> lines = entry.getValue();

                switch (action) {
                    case DO_NOTHING -> {
                        // Nothing to do
                    }
                    case DO_REMOVE -> {
                        for(SupplierOrderLine line : lines) {
                            oldOrder.getOrderLines().removeIf(l -> Objects.equals(l.getId(), line.getId()));

                        }
                    }
                    case DO_SAVE -> {
                        for(SupplierOrderLine line : lines) {
                            line.setId(null);
                            line.setOrder(oldOrder);
                            oldOrder.getOrderLines().add(line);
                        }

                    }
                    case DO_UPDATE -> {
                        for(SupplierOrderLine line : lines) {
                            SupplierOrderLine oldLine = oldOrder.getOrderLines().stream()
                                    .filter(l -> Objects.equals(l.getId(), line.getId()))
                                    .findFirst()
                                    .orElse(null);
                            if (oldLine == null) {
                                log.warn("Cannot update line with ID: {} - line not found", line.getId());
                                continue;
                            }

                            if (!oldLine.getProduct().equals(line.getProduct())) {
                                oldLine.setProduct(line.getProduct());
                            }

                            if (!oldLine.getQuantity().equals(line.getQuantity()) || !oldLine.getUnitPrice().equals(line.getUnitPrice())) {
                                oldLine.setQuantity(line.getQuantity());
                                oldLine.setUnitPrice(line.getUnitPrice());
                            }
                        }



                    }
                }
            }

    }

    // when dealing with supplier order , we only save the ordred quantity when rciving the order
    // so in this function when setting the reception status to ture , we should save quantity to the specific product
    private void updateOrderStatus(SupplierOrderDto newOrder, SupplierOrder oldOrder) {
        if (newOrder.paymentStatus() != oldOrder.getPaymentStatus()) {
            oldOrder.setPaymentStatus(newOrder.paymentStatus());
        }
        if (newOrder.receptionStatus() != oldOrder.getReceptionStatus()) {
            oldOrder.setReceptionStatus(newOrder.receptionStatus());
            for (SupplierOrderLine orderLine : oldOrder.getOrderLines()) {
                productExternalService.updateProductQuantityAndLastPurchasePrice(
                        orderLine.getProduct().getId(),
                        orderLine.getQuantity(),
                        orderLine.getUnitPrice());

            }
        }
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
    public Page<SupplierOrderResponseDto> getSupplierOrders(Pageable pageable, LocalDate fromDate, LocalDate toDate, ReceptionStatus receptionStatus, PaymentStatus paymentStatus, String keyword , Integer supplierId) {
        Specification<SupplierOrder> specification = Specification
                .where(SupplierOrderSpecification.hasDate(fromDate,toDate))
                .and(SupplierOrderSpecification.hasKeyWord(keyword))
                .and(SupplierOrderSpecification.hasReceptionStatus(receptionStatus))
                .and(SupplierOrderSpecification.hasPaymentStatus(paymentStatus))
                .and(SupplierOrderSpecification.hasSupplierId(supplierId));

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return transformToSupplierOrderResponseDto(repository.findAll(specification, pageable)) ;
    }

    private Page<SupplierOrderResponseDto> transformToSupplierOrderResponseDto(Page<SupplierOrder> orders) {
        return orders.map(order -> new SupplierOrderResponseDto(
                order.getId(),
                order.getOrderNumber(),
                order.getTotalExcludingTax(),
                order.getTotalIncludingTax(),
                order.getPaymentStatus(),
                order.getReceptionStatus(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                order.getPartner()
        ));
    }



    @Override
    public SupplierOrderDto getSupplierOrderById(Integer supplierOrderId) {
        SupplierOrder supplierOrder = repository.findById(supplierOrderId)
                .orElseThrow(() -> new ResourceNotFoundException("Cette commande fournisseur n'a pas été trouvée."));
        return mapper.toSupplierOrderDto(supplierOrder) ;
    }

    @Override
    public String getNewSupplierOrderNumber() {
        return CodeGeneratorService.generateNew(repository.findLastOrderNumber(),"CMF") ;
    }

    @Override
    public SupplierOrderStatistics getSupplierOrderStatistics() {
        return repository.getStatistics();
    }


}
