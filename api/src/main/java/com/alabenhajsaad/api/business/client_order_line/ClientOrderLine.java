package com.alabenhajsaad.api.business.client_order_line;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.supplier_order.SupplierOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "client_order_line")
@Builder
public class ClientOrderLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne()
    @JoinColumn(name = "client_order_id")
    @JsonIgnore
    private ClientOrder order;

    private Integer quantity;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;


    // --- Méthode pour total HT ---
    public BigDecimal getTotalExcludingTax() {
        if (unitPrice == null || quantity == null) return BigDecimal.ZERO;
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    // --- Méthode pour total TTC ---
    public BigDecimal getTotalIncludingTax() {
        if (unitPrice == null || quantity == null || product.getVat().getRate() == null) return BigDecimal.ZERO;
        BigDecimal tvaRate = BigDecimal.valueOf(product.getVat().getRate());
        BigDecimal multiplier = BigDecimal.ONE.add(
                tvaRate.divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP)
        );
        return getTotalExcludingTax().multiply(multiplier).setScale(2, RoundingMode.HALF_UP);
    }

}

