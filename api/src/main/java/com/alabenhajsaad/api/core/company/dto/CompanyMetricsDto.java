package com.alabenhajsaad.api.core.company.dto;

public record CompanyMetricsDto(
        Long totalCompanies,
        Long totalUsers,
        Long newCompaniesThisMonth,
        Number averageUsersPerCompany
) {}


