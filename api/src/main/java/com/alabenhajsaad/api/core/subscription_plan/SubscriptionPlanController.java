package com.alabenhajsaad.api.core.subscription_plan;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/subscriptionPlan")
public class SubscriptionPlanController {
    private final SubscriptionPlanService subscriptionPlanService;

    @PreAuthorize("hasAuthority('SCOPE_ROLE_SUPER_ADMIN')")
    @PostMapping()
    public ResponseEntity<ApiResponse<SubscriptionPlan>> createSubscriptionPlan(@RequestBody SubscriptionPlan plan) {
        SubscriptionPlan createdPlan = subscriptionPlanService.createSubscriptionPlan(plan);
        return ResponseEntity.ok(
                ApiResponse.success(createdPlan, "Le nouveau plan d'abonnement a été créé avec succès.")
        );
    }
    @PreAuthorize("hasAuthority('SCOPE_ROLE_SUPER_ADMIN')")
    @PutMapping()
    public ResponseEntity<ApiResponse<SubscriptionPlan>> updateSubscriptionPlan(@RequestBody SubscriptionPlan plan) {
        SubscriptionPlan updatedPlan = subscriptionPlanService.updateSubscriptionPlan(plan);
        return ResponseEntity.ok(
                ApiResponse.success(updatedPlan, "Le plan d'abonnement a été mis à jour avec succès.")
        );
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<SubscriptionPlan>>> getSubscriptionPlans() {
        List<SubscriptionPlan> plans = subscriptionPlanService.getSubscriptionPlans();
        return ResponseEntity.ok(
                ApiResponse.success(plans, "Liste des plans d'abonnement récupérée avec succès.")
        );
    }
    @PreAuthorize("hasAuthority('SCOPE_ROLE_SUPER_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSubscriptionPlanById(@PathVariable int id) {
        subscriptionPlanService.deleteSubscriptionPlan(id);
        return ResponseEntity.ok(
                ApiResponse.success(null, "plan d'abonnement supprimée avec succès")
        );
    }
}
