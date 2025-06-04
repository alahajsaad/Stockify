package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record PartnerResponseDto(
        Long id,
        PartnerType partnerType,
        String entityType,
        String email,
        LocalDate createdAt,
        LocalDate updatedAt,
        // Person fields (null if organization)
        String firstName,
        String lastName,
        // Organization fields (null if person)
        String companyName,
        String registrationNumber,
        String taxNumber
) {
}

