package com.alabenhajsaad.api.company;

import com.alabenhajsaad.api.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.company.mapper.CompanyMapper;
import com.alabenhajsaad.api.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.company.projection.CompanyViewForEmployeeProjection;

import com.alabenhajsaad.api.datasourceconfig.multitenant.DynamicDataSourceService;
import com.alabenhajsaad.api.datasourceconfig.datasource.DataSourceEntity;
import com.alabenhajsaad.api.datasourceconfig.datasource.DataSourceService;
import com.alabenhajsaad.api.exception.ConflictException;

import com.alabenhajsaad.api.fileManager.FileLoader;
import com.alabenhajsaad.api.user.AppUser;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository repository;
    private final FileLoader fileLoader;
    private final CompanyMapper mapper ;
    // This service is used to avoid the circular dependency issue
    // (CompanyService depends on UserService and vice versa).
    private final CompanyUserRelationService userService;
    private final DynamicDataSourceService dynamicDataSourceService;
    private final DataSourceService dataSourceService;

    @Value("${database.tenant.prefix}")
    private String dbPrefix;


    @Override
    @Transactional
    public Company createCompany(CompanyCreationDto dto, Integer adminId) {
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

        // Generate tenant ID and set it
        String tenantId = generateTenantId();
        company.setTenantId(tenantId);

        // Assign admin to the company
        AppUser admin = userService.getUserById(adminId);
        admin.setCompany(company);
        admin.setTenantId(tenantId);
        userService.updateUser(admin);

        // Set initial company state
        company.setNumberOfUser(1);

        // Construct the database URL dynamically
        String databaseUrl = dbPrefix + tenantId + "?createDatabaseIfNotExist=true";


        try {
            // Register new tenant
            dynamicDataSourceService.registerTenant(tenantId, databaseUrl);

            // Save the new DataSource entity
            DataSourceEntity dataSourceEntity = new DataSourceEntity();
            dataSourceEntity.setTenantId(tenantId);
            dataSourceEntity.setUrl(databaseUrl);
            dataSourceService.addDataSource(dataSourceEntity);

        } catch (Exception e) {
            // Log the error and handle rollback properly
            log.error("Failed to register tenant {}: {}", tenantId, e.getMessage(), e);
            throw new RuntimeException("Error during company creation, please try again.");
        }

        // Persist the company entity
        return repository.save(company);
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

    private String generateTenantId() {
        String characters = "0123456789ABCDEF";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < 6; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }
}
