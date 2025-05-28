package com.alabenhajsaad.api.core.company;


import com.alabenhajsaad.api.core.company.dto.CompanyMetricsDto;
import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.company.projection.CompanyViewForEmployeeProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface CompanyRepository extends JpaRepository<Company, Integer> {


    Boolean existsByTaxNumber(String taxNumber);


    @Query("SELECT e FROM Company e WHERE e.id = :id")
    CompanyViewForEmployeeProjection findCompanyByIdWithEmployeeView(Integer id);

    @Query("SELECT e FROM Company e WHERE e.isNew = true")
    List<CompanyFirstViewProjection> findNewCompanies();

    @Query("""
    SELECT new com.alabenhajsaad.api.core.company.dto.CompanyMetricsDto(
        COUNT(c),                                                          
        SUM(c.numberOfUser),                                               
        SUM(CASE WHEN c.subscription = 'FIFTEEN_DAY_TRIAL' THEN 1 ELSE 0 END),         
        SUM(CASE WHEN c.subscription = 'STANDARD_ANNUAL' THEN 1 ELSE 0 END),       
        SUM(CASE WHEN c.subscriptionEndDate < CURRENT_DATE THEN 1 ELSE 0 END), 
        SUM(CASE WHEN c.createdAt >= :firstDayOfMonth THEN 1 ELSE 0 END),   
        (1.0d * SUM(c.numberOfUser)) / COUNT(c)
    )
    FROM Company c
""")
    CompanyMetricsDto getCompanyMetrics(@Param("firstDayOfMonth") LocalDate firstDayOfMonth);




}
