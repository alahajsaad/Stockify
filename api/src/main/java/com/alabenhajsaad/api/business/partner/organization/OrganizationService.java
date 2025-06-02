package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.partner.PartnerType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrganizationService {
    Organization createOrganization(Organization organization);
    Organization updateOrganization(Organization organization);
    Organization findById(Long id);
    Page<Organization> getOrganizations(Pageable pageable , PartnerType roleType , String keyword);
}
