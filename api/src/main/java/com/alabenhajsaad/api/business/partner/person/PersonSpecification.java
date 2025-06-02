package com.alabenhajsaad.api.business.partner.person;

import com.alabenhajsaad.api.business.partner.PartnerType;
import org.springframework.data.jpa.domain.Specification;

public class PersonSpecification {
    private PersonSpecification(){}

    public static Specification<Person> hasKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), pattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), pattern)
            );
        };
    }
    public static Specification<Person> hasRoleType(PartnerType roleType) {
        return (root, query, criteriaBuilder) -> {
            if (roleType == null ) {
                return null;
            }
            return criteriaBuilder.equal(root.get("roleType"), roleType);
        };
    }
}
