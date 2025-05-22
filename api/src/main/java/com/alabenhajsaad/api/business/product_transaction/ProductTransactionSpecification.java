package com.alabenhajsaad.api.business.product_transaction;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ProductTransactionSpecification {

    private ProductTransactionSpecification() {}

    public static Specification<ProductTransactionView> filter(
            Integer productId,
            String transactionType,
            String keyword,
            LocalDate startDate,
            LocalDate endDate,
            Integer counterpartId
    ) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (productId != null) {
                predicates.add(cb.equal(root.get("productId"), productId));
            }

            if (transactionType != null && !transactionType.isBlank()) {
                predicates.add(cb.equal(cb.lower(root.get("transactionType")), transactionType.toLowerCase()));
            }

            if (keyword != null && !keyword.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("counterpartName")), "%" + keyword.toLowerCase() + "%"));
            }

            if (startDate != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("transactionDate"), startDate.atStartOfDay()));
            }

            if (endDate != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("transactionDate"), endDate.atTime(23,59,59)));
            }

            if (counterpartId != null) {  // New filter on counterpartId
                predicates.add(cb.equal(root.get("counterpartId"), counterpartId));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}

