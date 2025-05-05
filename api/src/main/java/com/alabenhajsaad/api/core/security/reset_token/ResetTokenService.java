package com.alabenhajsaad.api.core.security.reset_token;

import com.alabenhajsaad.api.core.user.AppUser;

public interface ResetTokenService {
    String generateAndCacheTokenOfValidation();
    boolean validateToken(String rawToken);
}
