package com.alabenhajsaad.api.company.mapper;

import com.alabenhajsaad.api.company.Company;
import com.alabenhajsaad.api.company.dto.CompanyCreationDto;

public interface CompanyMapper {
    Company toCompany(CompanyCreationDto dto) ;
    void updateCompanyFromDto(CompanyCreationDto dto,Company existingCompany);
}
