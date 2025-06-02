package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.partner.PartnerType;
import org.springframework.data.jpa.domain.Specification;

public class OrganizationSpecification {
    private OrganizationSpecification(){}

    public static Specification<Organization> hasKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("companyName")), pattern)
            );
        };
    }
    public static Specification<Organization> hasRoleType(PartnerType roleType) {
        return (root, query, criteriaBuilder) -> {
            if (roleType == null ) {
                return null;
            }
            return criteriaBuilder.equal(root.get("roleType"), roleType);
        };
    }
}
