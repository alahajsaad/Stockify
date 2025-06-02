package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.core.company.dto.CompanyMetricsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long>, JpaSpecificationExecutor<Partner> {

    @Query("""
    SELECT new com.alabenhajsaad.api.business.partner.partner.PartnerSearchResult(
        p.id,
        p.partnerType,
        p.email,
        p.createdAt,
        p.updatedAt,
        pe.firstName,
        pe.lastName,
        o.companyName,
        o.registrationNumber,
        o.taxNumber
    )
    FROM partner p
    LEFT JOIN person pe ON p.id = pe.id
    LEFT JOIN organization o ON o.id = p.id
    WHERE p.partnerType = :partnerType
    """)
    Page<PartnerSearchResult> findPartners(@Param("partnerType") PartnerType partnerType, Pageable pageable);
}

