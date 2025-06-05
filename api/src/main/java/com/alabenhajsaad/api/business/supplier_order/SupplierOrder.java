package com.alabenhajsaad.api.business.supplier_order;

import com.alabenhajsaad.api.business.partner.partner.Partner;
import com.alabenhajsaad.api.business.utils.*;
//import com.alabenhajsaad.api.business.partner.old.supplier.Supplier;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLine;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "payment_status")
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Column(name = "reception_status")
    @Enumerated(EnumType.STRING)
    private ReceptionStatus receptionStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true , fetch = FetchType.EAGER)
    private List<SupplierOrderLine> orderLines = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "partner_id", nullable = false)
    private Partner partner;

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
