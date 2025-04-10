package com.alabenhajsaad.api.core.company.dto;


import com.alabenhajsaad.api.core.enums.Subscription;

public record CompanyResponseDto(
        Integer id,
        String name,
        String taxNumber,
        String email,
        String phone,
        String address,
        String city,
        String zipCode,
        String logoUrl,
        Subscription subscription
) {}
