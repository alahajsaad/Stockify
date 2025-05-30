package com.alabenhajsaad.api.core.company;


import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.core.company.dto.CompanyMetricsDto;
import com.alabenhajsaad.api.core.company.dto.ConsultCompanyDto;
import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.company.projection.CompanyViewForEmployeeProjection;
import com.alabenhajsaad.api.core.subscription.Subscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface CompanyRepository extends JpaRepository<Company, Integer> {


    Boolean existsByTaxNumber(String taxNumber);


    @Query("SELECT e FROM Company e WHERE e.id = :id")
    CompanyViewForEmployeeProjection findCompanyByIdWithEmployeeView(Integer id);

    @Query("SELECT e FROM Company e WHERE e.isNew = true")
    List<CompanyFirstViewProjection> findNewCompanies();

    Page<Company> findAll(Pageable pageable);



    @Query("""
    SELECT new com.alabenhajsaad.api.core.company.dto.CompanyMetricsDto(
        COUNT(c),                                                          
        SUM(c.numberOfUser),                                               
        SUM(CASE WHEN c.createdAt >= :firstDayOfMonth THEN 1 ELSE 0 END),   
        (1.0d * SUM(c.numberOfUser)) / COUNT(c)
    )
    FROM Company c
""")
    CompanyMetricsDto getCompanyMetrics(@Param("firstDayOfMonth") LocalDate firstDayOfMonth);



    Page<Company> findAll(Specification<Company> spec, Pageable pageable);




}
