package com.alabenhajsaad.api.core.security.dto;

public record UpdatePasswordRequest(
        String email,
        String actualPassword,
        String password,
        String confirmPassword
) {
}
