package com.alabenhajsaad.api.business.client_order;

import com.alabenhajsaad.api.business.partner.partner.Partner;
import com.alabenhajsaad.api.business.utils.Auditable;
import com.alabenhajsaad.api.business.client_order_line.ClientOrderLine;
//import com.alabenhajsaad.api.business.partner.old.client.Client;
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
    @JoinColumn(name = "partner_id", nullable = false)
    private Partner partner;


}
