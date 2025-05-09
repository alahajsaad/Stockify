package com.alabenhajsaad.api.business.client_order;


import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class ClientOrderSpecification {

    public static Specification<ClientOrder> hasDate(LocalDate fromDate, LocalDate toDate) {
        return (root, query, criteriaBuilder) -> {
            if (fromDate == null && toDate == null) {
                return null;
            } else if (fromDate != null && toDate == null) {
                return criteriaBuilder.equal(root.get("date"), fromDate);
            }
            return criteriaBuilder.between(root.get("date"), fromDate, toDate);
        };
    }
    public static Specification<ClientOrder> hasPaymentStatus(PaymentStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null ) {
                return null;
            }
            return criteriaBuilder.equal(root.get("paymentStatus"), status);
        };
    }
    public static Specification<ClientOrder> hasDeliveryStatus(DeliveryStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null ) {
                return null;
            }
            return criteriaBuilder.equal(root.get("deliveryStatus"), status);
        };
    }

    public static Specification<ClientOrder> hasKeyWord(String keyword) {
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
}
