package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.partner.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrganizationService {
    Organization createOrganization(Organization organization);
    Organization updateOrganization(Organization organization);
    Organization findById(Long id);
    Page<Organization> getOrganizations(Pageable pageable , RoleType roleType , String keyword);
}
