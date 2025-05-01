package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.product.dto.ProductFilter;
import com.alabenhajsaad.api.core.exception.ConflictException;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repository;

    @Override
    public Product addProduct(Product product) {
        if(repository.existsByDesignation(product.getDesignation()) || repository.existsByReference(product.getReference())){
            throw new ConflictException("Ce produit existe déjà");
        }
        product.setStockStatus(StockStatus.OUT_OF_STOCK);
        return repository.save(product);
    }



    @Override
    public Page<Product> getFiltredProducts(ProductFilter productFilter) {
        Specification<Product> specification = Specification
                .where(ProductSpecification.hasCategory(productFilter.categoryId()))
                .and(ProductSpecification.hasStockStatus(productFilter.status()))
                .and(ProductSpecification.hasNameOrReferenceLike(productFilter.keyword()));

        Pageable pageable = productFilter.pageable();
        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return repository.findAll(specification, pageable);
    }

    @Override
    public Product getProductById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable"));
    }

    @Override
    public Product updateProduct(Product product) {
        return null;
    }


}
