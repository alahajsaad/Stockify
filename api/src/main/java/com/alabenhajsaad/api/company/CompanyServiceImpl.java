package com.alabenhajsaad.api.company;

import com.alabenhajsaad.api.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.company.mapper.CompanyMapper;
import com.alabenhajsaad.api.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.company.projection.CompanyViewForEmployeeProjection;

import com.alabenhajsaad.api.exception.ConflictException;

import com.alabenhajsaad.api.fileManager.FileLoader;
import com.alabenhajsaad.api.user.AppUser;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository repository;
    private final FileLoader fileLoader;
    private final CompanyMapper mapper ;
    // This service is used to avoid the circular dependency issue
    // (CompanyService depends on UserService and vice versa).
    private final CompanyUserRelationService userService;


    @Override
    @Transactional
    public Company createCompany(CompanyCreationDto dto , Integer adminId) {
        if (Boolean.TRUE.equals(repository.existsByTaxNumber(dto.taxNumber()))) {
            throw new ConflictException("Une entreprise avec ce numero fiscal : " + dto.taxNumber() + " existe déjà");
        }
        Company company = mapper.toCompany(dto);
        if (dto.logo() != null) {
            company.setLogo(fileLoader.uploadFile(dto.logo()));
        }
        String tenantId = generateTenantId() ;
        company.setTenantId(tenantId);
        AppUser admin = userService.getUserById(adminId) ;
        admin.setCompany(company);
        admin.setTenantId(tenantId) ;
        userService.updateUser(admin) ;
        company.setNumberOfUser(1);
        //tenantDataSourceFactory.getDataSource(tenantId);
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
