package com.alabenhajsaad.api.core.user.dto;

import lombok.Builder;

@Builder
public record EmployeeCreationDto(
        String firstName,
        String lastName,
        String email
) {
}
