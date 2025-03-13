package com.alabenhajsaad.api.company.dto;


import com.alabenhajsaad.api.enums.Subscription;

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
