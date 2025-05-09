package com.alabenhajsaad.api.business.client_order;

import com.alabenhajsaad.api.business.utils.Auditable;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
import com.alabenhajsaad.api.business.person.client.Client;
import com.alabenhajsaad.api.business.utils.DeliveryStatus;
import com.alabenhajsaad.api.business.utils.PaymentStatus;
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
@Table(name = "client_order")
public class ClientOrder extends Auditable {
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

    @Column(name = "delivery_status")
    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClientOrderLine> orderLines = new ArrayList<>();

    @ManyToOne
    private Client client;

    // Helper methods to manage bidirectional relationship
//    public void addOrderLine(ClientOrderLine orderLine) {
//        orderLines.add(orderLine);
//        orderLine.setOrder(this);
//    }
//
//    public void removeOrderLine(ClientOrderLine orderLine) {
//        orderLines.remove(orderLine);
//        orderLine.setOrder(null);
//    }
//
//    public void setOrderLines(List<ClientOrderLine> orderLines) {
//        // Clear existing lines
//        this.orderLines.clear();
//
//        // Add all new lines and maintain the relationship
//        if (orderLines != null) {
//            orderLines.forEach(this::addOrderLine);
//        }
//    }
}
