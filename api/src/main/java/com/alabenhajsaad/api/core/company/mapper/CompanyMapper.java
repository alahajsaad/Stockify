package com.alabenhajsaad.api.core.company.mapper;

import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.core.company.dto.CompanyResponseDto;

public interface CompanyMapper {
    Company toCompany(CompanyCreationDto dto) ;
    void updateCompanyFromDto(CompanyCreationDto dto,Company existingCompany);
    CompanyResponseDto toCompanyResponseDto(Company company);
}
