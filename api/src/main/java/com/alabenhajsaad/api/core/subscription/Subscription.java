package com.alabenhajsaad.api.core.subscription;

import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.subscription_plan.SubscriptionPlan;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status;

    @ManyToOne
    @JsonIgnore
    private Company company;


    @ManyToOne
    private SubscriptionPlan subscriptionPlan ;
}
