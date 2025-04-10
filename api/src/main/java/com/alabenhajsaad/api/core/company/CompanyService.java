package com.alabenhajsaad.api.core.company;



import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.company.projection.CompanyViewForEmployeeProjection;

import java.util.List;

public interface CompanyService {
    Company createCompany(CompanyCreationDto dto , Integer adminId) ;
    Company updateCompany(CompanyCreationDto dto);
    List<CompanyFirstViewProjection> getNewCompanies();
    CompanyViewForEmployeeProjection getCompanyByIdWithEmployeeView(Integer id);
    //List<Company> getFiltredCompanies();
    Company getCompanyById(Integer id) ;
}
