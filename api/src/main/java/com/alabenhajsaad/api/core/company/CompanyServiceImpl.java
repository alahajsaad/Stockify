package com.alabenhajsaad.api.core.company;

import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.product.ProductSpecification;
import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.core.company.dto.CompanyMetricsDto;
import com.alabenhajsaad.api.core.company.dto.CompanyResponseDto;
import com.alabenhajsaad.api.core.company.dto.ConsultCompanyDto;
import com.alabenhajsaad.api.core.company.mapper.CompanyMapper;
import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.company.projection.CompanyViewForEmployeeProjection;


import com.alabenhajsaad.api.core.exception.ConflictException;

import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import com.alabenhajsaad.api.core.subscription.Subscription;
import com.alabenhajsaad.api.core.subscription.SubscriptionService;
import com.alabenhajsaad.api.core.subscription.SubscriptionStatus;
import com.alabenhajsaad.api.core.subscription_plan.SubscriptionPlan;
import com.alabenhajsaad.api.core.subscription_plan.SubscriptionPlanService;
import com.alabenhajsaad.api.fileManager.FileLoader;
import com.alabenhajsaad.api.core.user.AppUser;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository repository;
    private final FileLoader fileLoader;
    private final CompanyMapper mapper ;
    private final CompanyUserRelationService userService;
    private final SubscriptionPlanService subscriptionPlanService;

    @Override
    @Transactional
    public CompanyResponseDto createCompany(CompanyCreationDto dto, Integer adminId) {
        if (Boolean.TRUE.equals(repository.existsByTaxNumber(dto.taxNumber()))) {
            throw new ConflictException("Une entreprise avec ce numéro fiscal : " + dto.taxNumber() + " existe déjà");
        }

        Company company = mapper.toCompany(dto);

        if (dto.logo() != null) {
            company.setLogo(fileLoader.uploadFile(dto.logo()));
        }

        AppUser admin = userService.getUserById(adminId);
        admin.setCompany(company);
        company.setIsNew(true);
        company.setTenantId(admin.getTenantId());
        company.setNumberOfUser(1);

        // Étape 1 : sauvegarder la société sans souscription
        company.setSubscriptions(new ArrayList<>());
        Company savedCompany = repository.save(company); // Persisted, now has an ID

        // Étape 2 : Créer la souscription d'essai
        SubscriptionPlan trialPlan = subscriptionPlanService.getSubscriptionPlanByName("FIFTEEN_DAY_TRIAL");

        Subscription subscription = Subscription.builder()
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(15))
                .status(SubscriptionStatus.ACTIVE)
                .subscriptionPlan(trialPlan)
                .company(savedCompany) // maintenant que la société est persistée
                .build();

        savedCompany.getSubscriptions().add(subscription);

        // Étape 3 : sauvegarder à nouveau la société avec la souscription
        savedCompany = repository.save(savedCompany);

        // mettre à jour l’admin
        userService.updateUser(admin);

        return mapper.toCompanyResponseDto(savedCompany);
    }



    @Override
    public Company updateCompany(CompanyCreationDto dto) {
        Company existingCompany = getCompanyById(dto.id());

        if (dto.name() != null && !dto.name().equals(existingCompany.getName())) {
            existingCompany.setName(dto.name());
        }

        if (dto.taxNumber() != null && !dto.taxNumber().equals(existingCompany.getTaxNumber())) {
            existingCompany.setTaxNumber(dto.taxNumber());
        }

        if (dto.email() != null && !dto.email().equals(existingCompany.getEmail())) {
            existingCompany.setEmail(dto.email());
        }

        if (dto.phone() != null && !dto.phone().equals(existingCompany.getPhone())) {
            existingCompany.setPhone(dto.phone());
        }

        if (dto.address() != null && !dto.address().equals(existingCompany.getAddress())) {
            existingCompany.setAddress(dto.address());
        }

        if (dto.city() != null && !dto.city().equals(existingCompany.getCity())) {
            existingCompany.setCity(dto.city());
        }

        if (dto.zipCode() != null && !dto.zipCode().equals(existingCompany.getZipCode())) {
            existingCompany.setZipCode(dto.zipCode());
        }

        if (dto.logo() != null && !dto.logo().isEmpty()) {
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

    @Override
    public Company getCompanyById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Company not found"));
    }

    @Override
    public CompanyMetricsDto getMetrics() {
        LocalDate firstDayOfMonth = LocalDate.now().withDayOfMonth(1);
        return repository.getCompanyMetrics(firstDayOfMonth);
    }

    @Override
    public Page<ConsultCompanyDto> getCompanies(Pageable pageable, String keyword, String subscriptionPlanName, SubscriptionStatus subscriptionStatus, Boolean isNew) {
        Specification<Company> specification = Specification
                .where(CompanySpecification.hasKeyword(keyword))
                .and(CompanySpecification.isNew(isNew))
                .and(CompanySpecification.hasLatestSubscriptionWithStatus(subscriptionStatus))
                .and(CompanySpecification.hasSubscriptionPlan(subscriptionPlanName));

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        // Use the standard findAll method which respects Specifications
        Page<Company> companies = repository.findAll(specification, pageable);

        // Transform to DTOs (you'll need to implement this transformation)
        return transformToConsultCompanyDto(companies);
    }

    private Page<ConsultCompanyDto> transformToConsultCompanyDto(Page<Company> companies) {
        return companies.map(company -> {
            Subscription latestSubscription = company.getSubscriptions().stream()
                    .max(Comparator.comparing(Subscription::getStartDate))
                    .orElse(null);

            return ConsultCompanyDto.builder()
                    .id(company.getId())
                    .name(company.getName())
                    .taxNumber(company.getTaxNumber())
                    .email(company.getEmail())
                    .phone(company.getPhone())
                    .isNew(company.getIsNew())
                    .currentSubscriptionPlanName(latestSubscription != null ?
                            latestSubscription.getSubscriptionPlan().getName() : null)
                    .currentSubscriptionStatus(latestSubscription != null ?
                            latestSubscription.getStatus() : null)
                    .build();
        });
    }


}
