package com.alabenhajsaad.api.core.subscription;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
    @Query("""
        SELECT sp.name as planName, COUNT(DISTINCT s.company.id) as companyCount
        FROM Subscription s 
        JOIN s.subscriptionPlan sp 
        WHERE s.status = :status 
        AND s.id IN (
            SELECT MAX(sub.id) 
            FROM Subscription sub 
            WHERE sub.company.id = s.company.id 
            AND sub.status = :status
            GROUP BY sub.company.id
        )
        GROUP BY sp.name
        """)
    List<Object[]> getSubscriptionPlanStatistics(@Param("status") SubscriptionStatus status);

    // Method to convert the result to Map
    default Map<String, Long> getSubscriptionPlanStatisticsAsMap() {
        List<Object[]> results = getSubscriptionPlanStatistics(SubscriptionStatus.ACTIVE);
        return results.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],  // plan name
                        row -> ((Number) row[1]).longValue()  // company count
                ));
    }

}
