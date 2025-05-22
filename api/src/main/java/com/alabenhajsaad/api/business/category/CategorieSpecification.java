package com.alabenhajsaad.api.business.category;

import org.springframework.data.jpa.domain.Specification;

public class CategorieSpecification {

    private CategorieSpecification() {}

    public static Specification<Category> hasKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), pattern)
            );
        };
    }
}
