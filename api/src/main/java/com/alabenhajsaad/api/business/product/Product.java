package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.category.Category;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLine;
import com.alabenhajsaad.api.business.vat.Vat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String designation;

    @Column(unique = true)
    private String reference;

    @Min(value = 0, message = "La quantité de ce produit ne peut pas être négative. Veuillez contacter votre fournisseur pour un réapprovisionnement.")
    private Integer quantity;

    @Column(name = "critical_threshold")
    private Integer criticalThreshold;

    @Column(name = "last_purchase_price")
    private BigDecimal lastPurchasePrice;

    @Column(name = "last_sale_price")
    private BigDecimal lastSalePrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "stock_status")
    private StockStatus stockStatus ;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Vat vat ;

    @OneToMany(mappedBy = "product" )
    @JsonIgnore
    private List<SupplierOrderLine> orderLines;
}
