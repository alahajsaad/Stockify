package com.alabenhajsaad.api.business.product_transaction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Immutable
@Table(name = "product_transactions")
public class ProductTransactionView {

    @Id
    @Column(name = "line_id")
    private Integer lineId;

    @Column(name = "order_number")
    private String orderNumber;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "transaction_type")
    private String transactionType; // "SALE" or "PURCHASE"

    @Column(name = "counterpart_name")
    private String counterpartName;

    @Column(name = "counterpart_id")
    private Integer counterpartId;

    @Column(name = "transaction_date")
    private LocalDate transactionDate;

}

