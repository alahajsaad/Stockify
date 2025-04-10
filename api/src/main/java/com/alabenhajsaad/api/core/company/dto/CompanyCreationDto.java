package com.alabenhajsaad.api.core.company.dto;

import com.alabenhajsaad.api.core.enums.Subscription;
import org.springframework.web.multipart.MultipartFile;

public record CompanyCreationDto(
        Integer id ,
        String name,
        String taxNumber,
        String email,
        String phone,
        String address,
        String city,
        String zipCode,
        MultipartFile logo,
        Subscription subscription

) {
}
