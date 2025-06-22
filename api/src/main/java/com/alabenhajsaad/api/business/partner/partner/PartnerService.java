package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PartnerService {
    Page<Partner> getPartners(Pageable pageable , String keyword , PartnerType type);
    Partner getPartnerById(Long id);
}
