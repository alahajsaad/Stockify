package com.alabenhajsaad.api.business.product.external;

import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.product.ProductRepository;
import com.alabenhajsaad.api.core.exception.InsufficientStockException;
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

    public Product findById(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product with id " + id + " not found")
        );
    }

    @Override
    @Transactional
    public void updateProductQuantityAndLastPurchasePrice(Integer productId, Integer quantity, BigDecimal unitPrice) {
        var product = findById(productId);
        //int currentQuantity = product.getQuantity() != null ? product.getQuantity() : 0;

        product.setQuantity( product.getQuantity() + quantity);
        product.setLastPurchasePrice(unitPrice);
        repository.save(product);
    }


    @Override
    public void updateProductQuantityAndLastSalePrice(Integer productId, Integer quantity, BigDecimal unitPrice) {
        var product = findById(productId);

        // Si on diminue le stock, il faut s'assurer qu'il y en a assez
        if (quantity > 0) {
            if (product.getQuantity() < quantity) {
                throw new InsufficientStockException("Le stock du produit est insuffisant pour cette transaction.");
            }
            product.setQuantity(product.getQuantity() - quantity);
        } else if (quantity < 0) {
            // On augmente le stock
            product.setQuantity(product.getQuantity() - quantity); // double négation => +stock
        }

        // Mise à jour du dernier prix de vente uniquement si > 0
        if (unitPrice != null && unitPrice.compareTo(BigDecimal.ZERO) > 0) {
            product.setLastSalePrice(unitPrice);
        }

        repository.save(product);
    }


    @Override
    public void undoUpdateProductQuantityAndLastSalePrice(Integer productId, Integer quantity) {
        var product = findById(productId) ;
        product.setQuantity(product.getQuantity() + quantity);
        repository.save(product);
    }
}
