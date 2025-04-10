package com.alabenhajsaad.api.core.company.mapper;

import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;

public interface CompanyMapper {
    Company toCompany(CompanyCreationDto dto) ;
    void updateCompanyFromDto(CompanyCreationDto dto,Company existingCompany);
}
