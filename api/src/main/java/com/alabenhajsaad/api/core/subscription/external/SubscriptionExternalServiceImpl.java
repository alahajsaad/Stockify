package com.alabenhajsaad.api.core.subscription.external;

import com.alabenhajsaad.api.core.subscription.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionExternalServiceImpl implements SubscriptionExternalService{
    private final SubscriptionRepository repository;
    @Override
    public boolean existsBySubscriptionPlanId(Integer subscriptionPlanId) {
        return repository.existsBySubscriptionPlan_id(subscriptionPlanId);
    }
}
