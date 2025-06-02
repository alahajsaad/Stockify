package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/organization")
public class OrganizationController {
    private final OrganizationService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Organization>> addOrganization(@RequestBody Organization organization) {
        return ResponseEntity.ok(ApiResponse.success(
                service.createOrganization(organization),
                "Organisation ajoutée avec succès."
        ));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Organization>> updateOrganization(@RequestBody Organization organization) {
        return ResponseEntity.ok(ApiResponse.success(
                service.updateOrganization(organization),
                "Organisation modifiée avec succès."
        ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Organization>>> getOrganizations(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) PartnerType roleType,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        service.getOrganizations(PageRequest.of(page, size), roleType, keyword),
                        "Liste des organisations récupérée avec succès."
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Organization>> getOrganization(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success(service.findById(id), "Organisation récupérée avec succès.")
        );
    }

}
