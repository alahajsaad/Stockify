package com.alabenhajsaad.api.core.company;

import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.core.company.dto.CompanyResponseDto;
import com.alabenhajsaad.api.core.company.mapper.CompanyMapper;
import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.company.projection.CompanyViewForEmployeeProjection;

import com.alabenhajsaad.api.core.datasource_config.multitenant.DynamicDataSourceService;
import com.alabenhajsaad.api.core.datasource_config.datasource.DataSourceEntity;
import com.alabenhajsaad.api.core.exception.ConflictException;

import com.alabenhajsaad.api.fileManager.FileLoader;
import com.alabenhajsaad.api.core.user.AppUser;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository repository;
    private final FileLoader fileLoader;
    private final CompanyMapper mapper ;
    private final CompanyUserRelationService userService;

    @Override
    @Transactional
    public CompanyResponseDto createCompany(CompanyCreationDto dto, Integer adminId) {
        // Check if tax number already exists
        if (Boolean.TRUE.equals(repository.existsByTaxNumber(dto.taxNumber()))) {
            throw new ConflictException("Une entreprise avec ce numéro fiscal : " + dto.taxNumber() + " existe déjà");
        }
        // Convert DTO to Entity
        Company company = mapper.toCompany(dto);
        // Upload logo if provided
        if (dto.logo() != null) {
            company.setLogo(fileLoader.uploadFile(dto.logo()));
        }
        // Assign admin to the company
        AppUser admin = userService.getUserById(adminId);
        admin.setCompany(company);
        userService.updateUser(admin);

        company.setTenantId(admin.getTenantId());
        company.setNumberOfUser(1);

        // Persist the company entity
        return mapper.toCompanyResponseDto(repository.save(company));
    }


    @Override
    public Company updateCompany(CompanyCreationDto dto) {
        Company existingCompany = getCompanyById(dto.id());

        mapper.updateCompanyFromDto(dto, existingCompany);
        if (dto.logo() != null) {
            existingCompany.setLogo(fileLoader.uploadFile(dto.logo()));
        }
        return repository.save(existingCompany);
    }

    @Override
    public List<CompanyFirstViewProjection> getNewCompanies() {
        List<CompanyFirstViewProjection> companies = repository.findNewCompanies();
        return companies.isEmpty() ? Collections.emptyList() : List.copyOf(companies);
    }

    @Override
    public CompanyViewForEmployeeProjection getCompanyByIdWithEmployeeView(Integer id) {
        return repository.findCompanyByIdWithEmployeeView(id);
    }

//    @Override
//    public Page<CompanyProjection> getFiltredCompanies(
//            String name ,
//            Subscription subscription ,
//            LocalDate startDate ,
//            LocalDate endDate ,
//            Pageable pageable)
//    {
//        Specification<CompanyProjection> spec = Specification
//                .where(CompanySpecification.hasSubscription(subscription))
//                .and();
//        return repository.findAll(spec, pageable);
//    }


    @Override
    public Company getCompanyById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Company not found"));
    }
}
