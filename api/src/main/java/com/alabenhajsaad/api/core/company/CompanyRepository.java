package com.alabenhajsaad.api.core.company;


import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.company.projection.CompanyViewForEmployeeProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CompanyRepository extends JpaRepository<Company, Integer> {


    Boolean existsByTaxNumber(String taxNumber);


    @Query("SELECT e FROM Company e WHERE e.id = :id")
    CompanyViewForEmployeeProjection findCompanyByIdWithEmployeeView(Integer id);

    @Query("SELECT e FROM Company e WHERE e.isNew = true")
    List<CompanyFirstViewProjection> findNewCompanies();

}
