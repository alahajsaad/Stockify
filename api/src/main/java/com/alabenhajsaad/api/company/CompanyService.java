package com.alabenhajsaad.api.company;



import com.alabenhajsaad.api.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.company.projection.CompanyViewForEmployeeProjection;

import java.util.List;

public interface CompanyService {
    Company createCompany(CompanyCreationDto dto , Integer adminId) ;
    Company updateCompany(CompanyCreationDto dto);
    List<CompanyFirstViewProjection> getNewCompanies();
    CompanyViewForEmployeeProjection getCompanyByIdWithEmployeeView(Integer id);
    //List<Company> getFiltredCompanies();
    Company getCompanyById(Integer id) ;
}
