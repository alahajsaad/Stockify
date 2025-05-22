package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.partner.RoleType;
import com.alabenhajsaad.api.core.exception.ConflictException;
import com.alabenhajsaad.api.core.exception.ValidationException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationRepository organizationRepository;

    @Override
    public Organization createOrganization(Organization organization) {

        // Vérifier l'unicité du numéro d'enregistrement
        if (organizationRepository.findByRegistrationNumber(organization.getRegistrationNumber()).isPresent()) {
            throw new ConflictException("Organization with registration number " +
                    organization.getRegistrationNumber() + " already exists");
        }
        handleOrganizationRelations(organization);

        return organizationRepository.save(organization);
    }

    @Override
    @Transactional
    public Organization updateOrganization(Organization updatedOrganization) {
        Organization existing = organizationRepository.findById(updatedOrganization.getId())
                .orElseThrow(() -> new EntityNotFoundException("Organization not found"));

        // Merge scalar fields (only if not null or changed)
        if (updatedOrganization.getCompanyName() != null &&
                !updatedOrganization.getCompanyName().equals(existing.getCompanyName())) {
            existing.setCompanyName(updatedOrganization.getCompanyName());
        }

        if (updatedOrganization.getRegistrationNumber() != null &&
                !updatedOrganization.getRegistrationNumber().equals(existing.getRegistrationNumber())) {
            existing.setRegistrationNumber(updatedOrganization.getRegistrationNumber());
        }

        if (updatedOrganization.getTaxNumber() != null &&
                !updatedOrganization.getTaxNumber().equals(existing.getTaxNumber())) {
            existing.setTaxNumber(updatedOrganization.getTaxNumber());
        }

        if (updatedOrganization.getRoleType() != null &&
                !updatedOrganization.getRoleType().equals(existing.getRoleType())) {
            existing.setRoleType(updatedOrganization.getRoleType());
        }

        // Email (optional)
        if (updatedOrganization.getEmail() != null &&
                !updatedOrganization.getEmail().equals(existing.getEmail())) {
            existing.setEmail(updatedOrganization.getEmail());
        }

        // Replace addresses
        if (updatedOrganization.getAddresses() != null) {
            existing.getAddresses().clear();
            updatedOrganization.getAddresses().forEach(addr -> {
                addr.setPartner(existing); // Set FK back-reference
                existing.getAddresses().add(addr);
            });
        }

        // Replace phone numbers
        if (updatedOrganization.getPhoneNumbers() != null) {
            existing.getPhoneNumbers().clear();
            updatedOrganization.getPhoneNumbers().forEach(phone -> {
                phone.setPartner(existing); // Set FK back-reference
                existing.getPhoneNumbers().add(phone);
            });
        }

        return organizationRepository.save(existing); // No insert, just update
    }

    @Override
    public Organization findById(Long id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Organization not found"));
    }

    @Override
    public Page<Organization> getOrganizations(Pageable pageable, RoleType roleType, String keyword) {
        Specification<Organization> specification = Specification
                .where(OrganizationSpecification.hasKeyword(keyword))
                .and(OrganizationSpecification.hasRoleType(roleType)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return organizationRepository.findAll(specification, pageable);
    }


    private void handleOrganizationRelations(Organization organization) {
        if (organization.getAddresses() != null) {
            organization.getAddresses().forEach(address -> address.setPartner(organization));
        }
        if (organization.getPhoneNumbers() != null) {
            organization.getPhoneNumbers().forEach(phone -> phone.setPartner(organization));
        }
    }

}
