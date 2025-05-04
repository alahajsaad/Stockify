package com.alabenhajsaad.api.business.product.external;

import java.math.BigDecimal;

public interface ProductExternalService {
    boolean existsByCategoryId(Integer categoryId);
    boolean existsByVatId(Integer vatId);
    void updateProductQuantityAndLastPurchasePrice(Integer productId, Integer quantity , BigDecimal unitPrice);
}
