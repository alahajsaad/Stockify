package com.alabenhajsaad.api.core.security.reset_token;

public record ResetTokenDto(
        String email,
        String password,
        String confirmPassword,
        String token
) {
}
