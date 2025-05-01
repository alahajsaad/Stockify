package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.business.Auditable;
import com.alabenhajsaad.api.business.PaymentMode;
import com.alabenhajsaad.api.business.person.supplier.Supplier;
import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLine;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "supplier_order")
public class SupplierOrder extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "order_number")
    private String orderNumber;

    @Column(name = "total_excluding_tax")
    private BigDecimal totalExcludingTax;

    @Column(name = "total_including_tax")
    private BigDecimal totalIncludingTax;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode")
    private PaymentMode paymentMode;

    @Column(name = "payment_due_date")
    private LocalDate paymentDueDate;

    @Column(name = "desired_delivery_date")
    private LocalDate desiredDeliveryDate;

    @Column(name = "is_received")
    private Boolean isReceived;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SupplierOrderLine> orderLines = new ArrayList<>();

    @ManyToOne
    private Supplier supplier;

    // Helper methods to manage bidirectional relationship
    public void addOrderLine(SupplierOrderLine orderLine) {
        orderLines.add(orderLine);
        orderLine.setOrder(this);
    }

    public void removeOrderLine(SupplierOrderLine orderLine) {
        orderLines.remove(orderLine);
        orderLine.setOrder(null);
    }

    public void setOrderLines(List<SupplierOrderLine> orderLines) {
        // Clear existing lines
        this.orderLines.clear();

        // Add all new lines and maintain the relationship
        if (orderLines != null) {
            orderLines.forEach(this::addOrderLine);
        }
    }
}
