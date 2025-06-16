package com.alabenhajsaad.api.business.supplier_order;


import com.alabenhajsaad.api.business.utils.PaymentStatus;
import com.alabenhajsaad.api.business.utils.ReceptionStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class SupplierOrderSpecification {
    public static Specification<SupplierOrder> hasDate(LocalDate fromDate, LocalDate toDate) {
        return (root, query, criteriaBuilder) -> {
            if (fromDate == null && toDate == null) {
                return null;
            } else if (fromDate != null && toDate == null) {
                return criteriaBuilder.equal(root.get("date"), fromDate);
            }
            return criteriaBuilder.between(root.get("date"), fromDate, toDate);
        };
    }
    public static Specification<SupplierOrder> hasPaymentStatus(PaymentStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) {
                return null;
            }
            return criteriaBuilder.equal(root.get("paymentStatus"), status);
        };
    }
    public static Specification<SupplierOrder> hasReceptionStatus(ReceptionStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null ) {
                return null;
            }
            return criteriaBuilder.equal(root.get("receptionStatus"), status);
        };
    }

    public static Specification<SupplierOrder> hasKeyWord(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("client").get("firstName")), pattern)
            );
        };
    }
    public static Specification<SupplierOrder> hasSupplierId(Integer supplierId) {
        return (root, query, criteriaBuilder) -> {
            if (supplierId == null) {
                return criteriaBuilder.conjunction(); // returns a predicate that always evaluates to true
            }
            return criteriaBuilder.equal(root.get("partner").get("id"), supplierId);
        };
    }
}
