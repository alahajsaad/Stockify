package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/organization")
public class OrganizationController {
    private final OrganizationService organizationService;

    @PostMapping
    public ResponseEntity<ApiResponse<Organization>> addOrganization(@RequestBody Organization organization) {
        return ResponseEntity.ok(ApiResponse.success(
                organizationService.createOrganization(organization),
                "organization ajoutée avec succès."
        ));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Organization>> updateOrganization(@RequestBody Organization organization) {
        return ResponseEntity.ok(ApiResponse.success(
                organizationService.updateOrganization(organization),
                "organization modifier avec success"
        ));
    }
}
