package com.alabenhajsaad.api.core.subscription_plan;

import java.util.List;

public interface SubscriptionPlanService {
    SubscriptionPlan createSubscriptionPlan(SubscriptionPlan subscriptionPlan);
    SubscriptionPlan updateSubscriptionPlan(SubscriptionPlan subscriptionPlan);
    List<SubscriptionPlan> getSubscriptionPlans();
    SubscriptionPlan getSubscriptionPlanByName(String name);
}
