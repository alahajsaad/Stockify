package com.alabenhajsaad.api.core.subscription;


import java.util.Map;

public interface SubscriptionService {
    Subscription addSubscription(Subscription subscription , Integer companyId);
    Map<String, Long> getSubscriptionPlanStatistics() ;
}
