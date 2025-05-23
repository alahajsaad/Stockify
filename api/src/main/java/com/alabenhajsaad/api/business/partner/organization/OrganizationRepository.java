package com.alabenhajsaad.api.business.partner.organization;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Optional<Organization> findByRegistrationNumber(String registrationNumber);
    Page<Organization> findAll(Specification<Organization> spec, Pageable pageable);
    @Query("SELECT o FROM organization o JOIN o.phoneNumbers pn WHERE pn.number = :number")
    Optional<Organization> findOrganizationByPhoneNumber(@Param("number") String number);
}
