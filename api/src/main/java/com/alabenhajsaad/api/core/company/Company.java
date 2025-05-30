package com.alabenhajsaad.api.core.company;


import com.alabenhajsaad.api.core.subscription.Subscription;
import com.alabenhajsaad.api.core.subscription.SubscriptionStatus;
import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.utils.Auditable;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Company extends Auditable {
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
    private Boolean isNew ;
    private String tenantId ;

    @OneToMany(mappedBy = "company" , cascade = CascadeType.ALL , orphanRemoval = true , fetch = FetchType.EAGER)
    private List<Subscription> subscriptions;

    @OneToMany(mappedBy = "company")
    @JsonIgnore
    private List<AppUser> users;

    public Subscription currentSubscription() {
        return this.getSubscriptions().stream()
                .filter(subscription -> subscription.getStatus() == SubscriptionStatus.ACTIVE)
                .max((s1, s2) -> s1.getEndDate().compareTo(s2.getEndDate()))
                .orElse(null);
    }

    public String currentSubscriptionName() {
        Subscription subscription = currentSubscription();
        return subscription != null ? subscription.getSubscriptionPlan().getName() : "No active subscription";
    }

    public SubscriptionStatus currentSubscriptionStatus() {
        Subscription current = currentSubscription();
        return current != null ? current.getStatus() : SubscriptionStatus.EXPIRED;
    }




}
