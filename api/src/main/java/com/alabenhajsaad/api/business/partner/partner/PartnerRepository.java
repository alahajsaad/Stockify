package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PartnerRepository extends JpaRepository<Partner, Long>, JpaSpecificationExecutor<Partner> {

//    @Query("""
//SELECT new com.alabenhajsaad.api.business.partner.partner.PartnerResponseDto(
//    p.id,
//    p.partnerType,
//    p.entityType,
//    p.email,
//    p.createdAt,
//    p.updatedAt,
//    pe.firstName,
//    pe.lastName,
//    o.companyName,
//    o.registrationNumber,
//    o.taxNumber
//)
//FROM partner p
//LEFT JOIN person pe ON p.id = pe.id
//LEFT JOIN organization o ON o.id = p.id
//WHERE p.partnerType = :partnerType
//AND (
//    :searchTerm IS NULL OR :searchTerm = ''
//    OR (
//        (p.entityType = 'PERSON' AND CONCAT(pe.firstName, ' ', pe.lastName) LIKE CONCAT('%', :searchTerm, '%'))
//        OR (p.entityType = 'ORGANIZATION' AND o.companyName LIKE CONCAT('%', :searchTerm, '%'))
//    )
//)
//""")
//    Page<PartnerResponseDto> findPartners(
//            @Param("partnerType") PartnerType partnerType,
//            @Param("searchTerm") String searchTerm,
//            Pageable pageable
//    );



        @Query("""
SELECT p
FROM partner p
LEFT JOIN person pe ON p.id = pe.id
LEFT JOIN organization o ON o.id = p.id
WHERE p.partnerType = :partnerType
AND (
    :searchTerm IS NULL OR :searchTerm = ''
    OR (
        (p.entityType = 'PERSON' AND CONCAT(pe.firstName, ' ', pe.lastName) LIKE CONCAT('%', :searchTerm, '%'))
        OR (p.entityType = 'ORGANIZATION' AND o.companyName LIKE CONCAT('%', :searchTerm, '%'))
    )
)
""")
    Page<Partner> findPartners(
            @Param("partnerType") PartnerType partnerType,
            @Param("searchTerm") String searchTerm,
            Pageable pageable
    );



}

