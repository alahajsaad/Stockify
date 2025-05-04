package com.alabenhajsaad.api.core.security.refresh_token;

import com.alabenhajsaad.api.core.user.AppUser;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface RefreshTokenService {
     Map<String, String> generateAndSaveRefreshToken(AppUser user, HttpServletRequest request) ;
     RefreshToken validateRefreshToken(String rawToken);
     void revokeRefreshToken(String refreshToken);
     String generateAndCacheTokenOfValidation(AppUser user);
}
