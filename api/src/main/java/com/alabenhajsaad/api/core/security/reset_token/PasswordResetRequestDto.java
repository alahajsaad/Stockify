package com.alabenhajsaad.api.core.security.reset_token;

public record PasswordResetRequestDto(
        String email,
        String password,
        String confirmPassword,
        String token
) {
}
