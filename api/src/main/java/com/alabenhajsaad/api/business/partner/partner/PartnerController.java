package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/partner")
public class PartnerController {
    private final PartnerService partnerService;
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Partner>>> getPartners(
            @RequestParam(required = false) String keyword,
            @RequestParam PartnerType partnerType,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "8") Integer size
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                partnerService.getPartners(PageRequest.of(page, size) ,keyword, partnerType )
        ));
    }
}
