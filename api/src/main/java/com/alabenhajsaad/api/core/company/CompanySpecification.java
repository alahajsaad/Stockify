package com.alabenhajsaad.api.core.company;

import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.product.StockStatus;
import com.alabenhajsaad.api.core.company.dto.ConsultCompanyDto;
import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.subscription.Subscription;
import com.alabenhajsaad.api.core.subscription.SubscriptionStatus;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

public class CompanySpecification {
    private CompanySpecification(){}


    public static Specification<Company> hasLatestSubscriptionWithStatus(SubscriptionStatus subscriptionStatus) {
        return (root, query, cb) -> {
            if (subscriptionStatus == null || subscriptionStatus == SubscriptionStatus.ALL) {
                return null;
            }

            // Subquery to get the max startDate for the company's subscriptions
            Subquery<LocalDate> subquery = query.subquery(LocalDate.class);
            Root<Subscription> subRoot = subquery.from(Subscription.class);

            // Fix: Cast the path to LocalDate type
            subquery.select(cb.greatest(subRoot.<LocalDate>get("startDate")));
            subquery.where(cb.equal(subRoot.get("company"), root));

            // Join company -> subscriptions
            Join<Company, Subscription> subscriptionJoin = root.join("subscriptions");

            return cb.and(
                    cb.equal(subscriptionJoin.get("startDate"), subquery),
                    cb.equal(subscriptionJoin.get("status"), subscriptionStatus)
            );
        };
    }

    public static Specification<Company> isNew(Boolean isNew) {
//                           ^^^^^^^ Change to Company
        return (root, query, criteriaBuilder) -> {
            if (isNew == null) {
                return null;
            }
            return criteriaBuilder.equal(root.get("isNew"), isNew);
        };
    }

    public static Specification<Company> hasKeyword(String keyword) {
//                           ^^^^^^^ Change to Company
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
    public static Specification<Company> hasSubscriptionPlan(String subscriptionPlanName) {
        return (root, query, cb) -> {
            if (subscriptionPlanName == null) {
                return null;
            }

            Subquery<LocalDate> subquery = query.subquery(LocalDate.class);
            Root<Subscription> subRoot = subquery.from(Subscription.class);
            subquery.select(cb.greatest(subRoot.<LocalDate>get("startDate")));
            subquery.where(cb.equal(subRoot.get("company"), root));

            Join<Company, Subscription> subscriptionJoin = root.join("subscriptions");

            return cb.and(
                    cb.equal(subscriptionJoin.get("startDate"), subquery),
                    cb.equal(subscriptionJoin.get("subscriptionPlan").get("name"), subscriptionPlanName)
            );
        };
    }

}
