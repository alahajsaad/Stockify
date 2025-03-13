package com.alabenhajsaad.api.company;


import com.alabenhajsaad.api.enums.EntityStatus;
import com.alabenhajsaad.api.enums.Subscription;
import com.alabenhajsaad.api.user.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String taxNumber;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String zipCode;
    private String logo ;
    private Integer numberOfUser ;
    private boolean isNew ;
    private String tenantId ;
    @Enumerated(EnumType.STRING)
    private Subscription subscription;
    @Enumerated(EnumType.STRING)
    private EntityStatus status ;

    private LocalDate createdAt ;
    private LocalDate updatedAt ;

    @OneToMany(mappedBy = "company")
    private List<AppUser> users;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
        this.updatedAt = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDate.now();
    }



}
