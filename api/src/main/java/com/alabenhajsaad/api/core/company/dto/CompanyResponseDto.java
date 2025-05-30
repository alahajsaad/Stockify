package com.alabenhajsaad.api.core.company.dto;


import com.alabenhajsaad.api.core.subscription.SubscriptionStatus;
import lombok.Builder;

@Builder
public record CompanyResponseDto(
        Integer id,
        String name,
        String taxNumber,
        String email,
        String phone,
        String currentSubscription,
        SubscriptionStatus currentSubscriptionStatus

) {}
