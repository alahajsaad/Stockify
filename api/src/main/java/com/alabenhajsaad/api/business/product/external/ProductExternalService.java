package com.alabenhajsaad.api.business.product.external;

import java.math.BigDecimal;

public interface ProductExternalService {
    boolean existsByCategoryId(Integer categoryId);
    boolean existsByVatId(Integer vatId);
    void updateProductQuantity(Integer productId, Integer quantity , BigDecimal unitPrice);
}
