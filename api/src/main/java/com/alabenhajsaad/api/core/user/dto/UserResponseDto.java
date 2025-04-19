package com.alabenhajsaad.api.core.user.dto;


import com.alabenhajsaad.api.core.company.dto.CompanyResponseDto;
import com.alabenhajsaad.api.core.enums.EntityStatus;
import com.alabenhajsaad.api.core.enums.Role;
import lombok.Builder;

@Builder
public record UserResponseDto(
        Integer id,
        String firstName,
        String lastName,
        String email,
        Role role,
        EntityStatus status,
        CompanyResponseDto company

) {
}
