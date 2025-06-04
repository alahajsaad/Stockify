package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PartnerService {
    Page<PartnerResponseDto> getPartners(Pageable pageable , String keyword , PartnerType type);
}
