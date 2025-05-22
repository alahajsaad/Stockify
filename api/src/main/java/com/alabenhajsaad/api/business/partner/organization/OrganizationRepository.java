package com.alabenhajsaad.api.business.partner.organization;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Optional<Organization> findByRegistrationNumber(String registrationNumber);
    Page<Organization> findAll(Specification<Organization> spec, Pageable pageable);
}
