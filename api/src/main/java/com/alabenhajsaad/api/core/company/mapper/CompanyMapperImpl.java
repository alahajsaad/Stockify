package com.alabenhajsaad.api.core.company.mapper;

import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.core.company.dto.CompanyResponseDto;
import com.alabenhajsaad.api.core.enums.Subscription;
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
                .subscription(Subscription.FIFTEEN_DAY_TRIAL)
                .isNew(true)
                .build();
    }

    @Override
    public void updateCompanyFromDto(CompanyCreationDto dto, Company existingCompany) {

    }

    @Override
    public CompanyResponseDto toCompanyResponseDto(Company company) {
        return CompanyResponseDto.builder()
                .id(company.getId())
                .name(company.getName())
                .email(company.getEmail())
                .phone(company.getPhone())
                .build();
    }
}
