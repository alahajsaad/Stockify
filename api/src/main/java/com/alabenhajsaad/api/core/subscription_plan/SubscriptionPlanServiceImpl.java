package com.alabenhajsaad.api.core.subscription_plan;

import com.alabenhajsaad.api.core.exception.ConflictException;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import com.alabenhajsaad.api.core.subscription.external.SubscriptionExternalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class SubscriptionPlanServiceImpl implements SubscriptionPlanService {
    private final SubscriptionPlanRepository repository;
    private final SubscriptionExternalService subscriptionExternalService;
    @Override
    public SubscriptionPlan createSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        if(repository.existsByName(subscriptionPlan.getName())){
            throw new ConflictException("Un plan d'abonnement avec ce nom existe déjà.");
        }
        return repository.save(subscriptionPlan);
    }

    @Override
    public SubscriptionPlan updateSubscriptionPlan(SubscriptionPlan subscriptionPlan) {
        if(!repository.existsById(subscriptionPlan.getId())){
            throw new ResourceNotFoundException("Le plan d'abonnement spécifié n'existe pas.");
        }
        return repository.save(subscriptionPlan);
    }

    @Override
    public List<SubscriptionPlan> getSubscriptionPlans() {
        return repository.findAll();
    }


    @Override
    public SubscriptionPlan getSubscriptionPlanByName(String name) {
        return repository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan '" + name + "' not found"));
    }

    @Override
    public void deleteSubscriptionPlan(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Le plan d'abonnement avec l'ID " + id + " est introuvable.");
        }

        if (subscriptionExternalService.existsBySubscriptionPlanId(id)) {
            throw new IllegalStateException("Impossible de supprimer ce plan d'abonnement car il est déjà utilisé.");
        }

        repository.deleteById(id);
    }


}
