package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.Address;
import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.business.partner.PhoneNumber;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record PartnerSearchResult(
        Long id,
        PartnerType partnerType,
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

