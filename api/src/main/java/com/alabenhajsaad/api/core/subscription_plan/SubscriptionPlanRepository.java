package com.alabenhajsaad.api.core.subscription_plan;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan, Integer> {
    boolean existsByName(String name);
    Optional<SubscriptionPlan> findByName(String name);
}
