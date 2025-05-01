package com.alabenhajsaad.api.business.product;

import org.springframework.data.jpa.domain.Specification;


public class ProductSpecification {

    public static Specification<Product> hasCategory(Integer categoryId) {
        return (root, query, criteriaBuilder) -> {
            if (categoryId == null) {
                return null; // Pas de filtre si categoryId est nul
            }
            // Utiliser l'ID de la catégorie pour effectuer la comparaison
            return criteriaBuilder.equal(root.get("category").get("id"), categoryId);
        };
    }


    public static Specification<Product> hasStockStatus(StockStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) {
                return null;
            }
            return criteriaBuilder.equal(root.get("stockStatus"), status);
        };
    }
    //Quand il tape un mot, tu cherches dans nom OU référence en même temps.
    public static Specification<Product> hasNameOrReferenceLike(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), pattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("reference")), pattern)
            );
        };
    }


}

