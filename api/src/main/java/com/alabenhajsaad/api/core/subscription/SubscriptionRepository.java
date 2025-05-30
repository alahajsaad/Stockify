package com.alabenhajsaad.api.core.subscription;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
//    @Query("SELECT s FROM Subscription s WHERE s.company.id = :companyId AND s.status = 'ACTIVE'")
//    Optional<Subscription> findActiveSubscription(@Param("companyId") Integer companyId);

    Optional<Subscription> findTopByCompanyIdAndStatusOrderByEndDateDesc(Integer companyId, SubscriptionStatus status);

}
