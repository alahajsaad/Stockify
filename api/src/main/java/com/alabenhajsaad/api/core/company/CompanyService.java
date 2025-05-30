package com.alabenhajsaad.api.core.company;



import com.alabenhajsaad.api.core.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.core.company.dto.CompanyMetricsDto;
import com.alabenhajsaad.api.core.company.dto.CompanyResponseDto;
import com.alabenhajsaad.api.core.company.dto.ConsultCompanyDto;
import com.alabenhajsaad.api.core.company.projection.CompanyFirstViewProjection;
import com.alabenhajsaad.api.core.company.projection.CompanyViewForEmployeeProjection;
import com.alabenhajsaad.api.core.subscription.SubscriptionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CompanyService {
    CompanyResponseDto createCompany(CompanyCreationDto dto , Integer adminId) ;
    Company updateCompany(CompanyCreationDto dto);
    List<CompanyFirstViewProjection> getNewCompanies();
    CompanyViewForEmployeeProjection getCompanyByIdWithEmployeeView(Integer id);
    Company getCompanyById(Integer id) ;
    CompanyMetricsDto getMetrics();
    Page<ConsultCompanyDto> getCompanies(Pageable pageable , String keyword, String subscriptionPlanName , SubscriptionStatus subscriptionStatus , Boolean isNew);
}
