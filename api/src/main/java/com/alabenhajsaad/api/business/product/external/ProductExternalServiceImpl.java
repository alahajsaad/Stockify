package com.alabenhajsaad.api.business.product.external;

import com.alabenhajsaad.api.business.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
