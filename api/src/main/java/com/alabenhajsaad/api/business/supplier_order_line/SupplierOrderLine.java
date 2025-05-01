package com.alabenhajsaad.api.business.supplier_order_line;

import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.supplier_order.SupplierOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "supplier_order_line")
@Builder
public class SupplierOrderLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "supplier_order_id")
    @JsonIgnore
    private SupplierOrder order;




    private Integer quantity;
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    @Column(name = "value_added_tax")
    private Double valueAddedTax ;
}

