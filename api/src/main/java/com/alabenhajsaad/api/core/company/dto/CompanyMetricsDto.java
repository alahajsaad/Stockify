package com.alabenhajsaad.api.core.company.dto;

public record CompanyMetricsDto(
        Long totalCompanies,
        Long totalUsers,
        Long companiesOnTrialPlan,
        Long companiesOnStandardPlan,
        Long companiesWithExpiredPlans,
        Long newCompaniesThisMonth,
        Number averageUsersPerCompany
) {}


