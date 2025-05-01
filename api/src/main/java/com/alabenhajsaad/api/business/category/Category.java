package com.alabenhajsaad.api.business.category;

import com.alabenhajsaad.api.business.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "category" , fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Product> products ;
}
