package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.business.code_generator.CodeGeneratorService;
import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SupplierOrderServiceImpl implements SupplierOrderService{
    private final SupplierOrderRepository repository;
    private final ProductExternalService productService ;

    @Override
    public SupplierOrder saveSupplierOrder(SupplierOrder supplierOrder) {
        supplierOrder.setIsReceived(false);
        return repository.save(supplierOrder);
    }

    @Override
    @Transactional
    public void setSupplierOrderAsRecived(Integer supplierOrderId) {
        var supplierOrder = getSupplierOrderById(supplierOrderId);
        supplierOrder.setIsReceived(true);
        supplierOrder.getOrderLines()
                .forEach(line -> productService.updateProductQuantityAndLastPurchasePrice(line.getProduct().getId(),line.getQuantity() , line.getUnitPrice()));
        repository.save(supplierOrder) ;
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
