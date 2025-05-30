package com.alabenhajsaad.api.core.subscription_plan;

import com.alabenhajsaad.api.core.subscription.Subscription;
import com.alabenhajsaad.api.core.user.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SubscriptionPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    @Column(unique = true)
    private String name;
    private Double price ;
    private Integer maxUsers ;
    private Integer maxStorageMb ;
    private String features;

    @OneToMany(mappedBy = "subscriptionPlan")
    @JsonIgnore
    private List<Subscription> subscriptionList;
}
