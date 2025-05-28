package com.alabenhajsaad.api.core.security.dto;

public record PasswordResetRequestDto(
        String email,
        String password,
        String confirmPassword,
        String token
) {
}
