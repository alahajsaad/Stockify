package com.alabenhajsaad.api.business.vat;

import com.alabenhajsaad.api.business.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "value_added_tax")
public class Vat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    @Column(unique = true, nullable = false)
    private Double rate ;
    private String description;

    @OneToMany(mappedBy = "vat")
    private List<Product> products ;
}
