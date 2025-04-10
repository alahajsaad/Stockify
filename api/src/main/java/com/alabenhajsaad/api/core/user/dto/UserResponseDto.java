package com.alabenhajsaad.api.core.user.dto;


import com.alabenhajsaad.api.core.enums.EntityStatus;
import com.alabenhajsaad.api.core.enums.Role;
import lombok.Builder;

@Builder
public record UserResponseDto(
        Integer id,
        String firstName,
        String lastName,
        String email

) {
}
