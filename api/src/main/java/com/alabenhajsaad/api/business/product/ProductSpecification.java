package com.alabenhajsaad.api.business.product;

import org.springframework.data.jpa.domain.Specification;


public class ProductSpecification {


    public static Specification<Product> hasStockStatus(StockStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null || status == StockStatus.ALL) {
                return null;
            }
            return criteriaBuilder.equal(root.get("stockStatus"), status);
        };
    }
    //Quand il tape un mot, tu cherches dans nom OU référence en même temps.
    public static Specification<Product> hasNameOrReferenceOrCategoryLike(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("designation")), pattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("reference")), pattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("category").get("name")), pattern)
            );
        };
    }


}

