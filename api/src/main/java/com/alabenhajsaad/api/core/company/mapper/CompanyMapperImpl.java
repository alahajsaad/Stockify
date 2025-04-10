package com.alabenhajsaad.api.core.company.mapper;

import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;
import org.springframework.stereotype.Service;

@Service
public class CompanyMapperImpl implements CompanyMapper {
    @Override
    public Company toCompany(CompanyCreationDto dto) {
        return Company.builder()
                .name(dto.name())
                .taxNumber(dto.taxNumber())
                .email(dto.email())
                .phone(dto.phone())
                .address(dto.address())
                .city(dto.city())
                .zipCode(dto.zipCode())
                .subscription(dto.subscription())
                .isNew(true)
                .build();
    }

    @Override
    public void updateCompanyFromDto(CompanyCreationDto dto, Company existingCompany) {

    }
}
