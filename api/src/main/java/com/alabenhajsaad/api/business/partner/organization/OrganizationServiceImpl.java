package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.partner.PhoneNumber;
import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.business.utils.ErrorMessages;
import com.alabenhajsaad.api.core.exception.ConflictException;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationRepository organizationRepository;

    @Override
    @Transactional
    public Organization createOrganization(Organization organization) {
        if (organizationRepository.findByRegistrationNumber(organization.getRegistrationNumber()).isPresent()) {
            throw new ConflictException("Une organisation avec le numéro d'enregistrement '" + organization.getRegistrationNumber() + "' existe déjà.");
        }
        validatePhoneNumbers(organization,false);
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

        if (updatedOrganization.getPartnerType() != null &&
                !updatedOrganization.getPartnerType().equals(existing.getPartnerType())) {
            existing.setPartnerType(updatedOrganization.getPartnerType());
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
    public Page<Organization> getOrganizations(Pageable pageable, PartnerType roleType, String keyword) {
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

    private void validatePhoneNumbers(Organization organization, boolean isUpdate) {
        List<PhoneNumber> numberList = organization.getPhoneNumbers();
        if (numberList == null || numberList.isEmpty()) {
            throw new EntityNotFoundException(ErrorMessages.NO_PHONE_NUMBER);
        }

        numberList.forEach(phone -> {
            Optional<Organization> existingOrg = organizationRepository.findOrganizationByPhoneNumber(phone.getNumber());
            if (existingOrg.isPresent()) {
                boolean sameOrganization = existingOrg.get().getId().equals(organization.getId());
                if (!isUpdate || !sameOrganization) {
                    throw new ConflictException("Le numéro de téléphone '" + phone.getNumber() +
                            "' est déjà utilisé par " + existingOrg.get().getCompanyName());

                }
            }
        });
    }
}
