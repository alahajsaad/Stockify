package com.alabenhajsaad.api.business.product.external;

public interface ProductExternalService {
    boolean existsByCategoryId(Integer categoryId);
    boolean existsByVatId(Integer vatId);
}
