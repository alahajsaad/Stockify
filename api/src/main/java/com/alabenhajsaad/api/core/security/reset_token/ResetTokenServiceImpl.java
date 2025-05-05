package com.alabenhajsaad.api.core.security.reset_token;

import com.alabenhajsaad.api.core.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;


@Service
@RequiredArgsConstructor
public class ResetTokenServiceImpl implements ResetTokenService{
    private final ResetTokenCacheService cacheService ;
    private static final SecureRandom secureRandom = new SecureRandom(); // thread-safe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder().withoutPadding();

    @Override
    public String generateAndCacheTokenOfValidation() {
        Instant now = Instant.now();
        String rawToken = generateSecureToken();

        ResetTokenPayload payload = new ResetTokenPayload();
        payload.setIssuedAt(now);
        payload.setExpiresAt(now.plus(15, ChronoUnit.MINUTES));

        cacheService.cacheToken(rawToken, payload);

        return rawToken;
    }

    public static String generateSecureToken() {
        byte[] randomBytes = new byte[32]; // 256-bit token
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

    @Override
    public boolean validateToken(String rawToken) {
        ResetTokenPayload payload = cacheService.getToken(rawToken);

        if (payload == null || payload.getExpiresAt().isBefore(Instant.now())) {
            return false;
        }

        cacheService.deleteToken(rawToken);
        return true;
    }

}
