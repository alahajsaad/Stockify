package com.alabenhajsaad.api.business.person.client;

import org.springframework.data.jpa.domain.Specification;

public class ClientSpecification {

    public static Specification<Client> hasNameOrPhoneNumberLike(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), pattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("phoneNumbers").get("number")), pattern)
            );
        };
    }
}
