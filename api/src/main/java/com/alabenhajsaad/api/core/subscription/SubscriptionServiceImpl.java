package com.alabenhajsaad.api.core.subscription;


import com.alabenhajsaad.api.core.company.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService{
    private final SubscriptionRepository repository;
    private final CompanyService companyService;


    @Override
    public Subscription addSubscription(Subscription subscription , Integer companyId) {
        var company  = companyService.getCompanyById(companyId);
        subscription.setCompany(company);
        return repository.save(subscription);
    }

    public Map<String, Long> getSubscriptionPlanStatistics() {
        return repository.getSubscriptionPlanStatisticsAsMap();
    }


}
