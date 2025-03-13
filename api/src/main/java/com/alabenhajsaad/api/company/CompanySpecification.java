package com.alabenhajsaad.api.company;

import com.alabenhajsaad.api.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.enums.Subscription;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class CompanySpecification {
    public static Specification<CompanyFirstViewProjection> hasSubscription(Subscription subscription) {
        return (root, query, criteriaBuilder) -> {
            if (subscription == null) {
                return criteriaBuilder.conjunction(); // Ne rien ajouter à la requête
            }

            return criteriaBuilder.equal(root.get("company"), subscription);
        };
    }

    public static Specification<CompanyFirstViewProjection> hasMachineReference(String reference) {
        return (root, query, criteriaBuilder) -> {
            if (reference == null || reference.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("machine").get("reference"), reference);
        };
    }
}
