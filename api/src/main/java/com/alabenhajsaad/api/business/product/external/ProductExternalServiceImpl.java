package com.alabenhajsaad.api.business.product.external;

import com.alabenhajsaad.api.business.product.ProductRepository;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ProductExternalServiceImpl implements ProductExternalService {
    private final ProductRepository repository;

    @Override
    public boolean existsByCategoryId(Integer categoryId) {
        return repository.existsByCategory_Id(categoryId);
    }

    @Override
    public boolean existsByVatId(Integer vatId) {
        return repository.existsByVat_Id(vatId);
    }

    @Override
    @Transactional
    public void updateProductQuantity(Integer productId, Integer quantity , BigDecimal unitPrice) {
        var product = repository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id " + productId + " not found")
        );
        product.setQuantity(product.getQuantity() + quantity);
        product.setLastPurchasePrice(unitPrice) ;
        repository.save(product);
    }
}
