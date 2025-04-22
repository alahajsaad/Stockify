package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.category.Category;
import com.alabenhajsaad.api.business.vat.Vat;
import jakarta.persistence.*;
import lombok.*;

@Data
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
    private Integer quantity;
    private Integer criticalThreshold;
    private ProductStatus productStatus ;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Vat vat ;
}
