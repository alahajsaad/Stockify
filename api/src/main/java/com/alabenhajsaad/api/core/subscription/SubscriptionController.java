package com.alabenhajsaad.api.core.subscription;

import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.core.company.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/subscription")
@PreAuthorize("hasAuthority('SCOPE_ROLE_SUPER_ADMIN')")
public class SubscriptionController {
    private final SubscriptionService service;

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<Map<String,Long>>> getSubscriptionPlanStatistics() {
        return ResponseEntity.ok(ApiResponse.success(service.getSubscriptionPlanStatistics()));
    }
}
