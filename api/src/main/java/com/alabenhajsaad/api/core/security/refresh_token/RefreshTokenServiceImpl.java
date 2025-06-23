package com.alabenhajsaad.api.core.security.refresh_token;

import com.alabenhajsaad.api.core.exception.ExpiredRefreshTokenException;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import com.alabenhajsaad.api.core.user.AppUser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final RefreshTokenRepository repository ;
    private static final SecureRandom secureRandom = new SecureRandom(); // thread-safe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder().withoutPadding();

    @Override
    public Map<String, String> generateAndSaveRefreshToken(AppUser user, HttpServletRequest request) {

        Instant instant = Instant.now();

        String rawToken = generateSecureToken(); // already base64-encoded
        String hashedToken = hashToken(rawToken);

        var refreshToken = RefreshToken.builder()
                .token(rawToken) // or hash this before saving, if needed
                .issuedAt(instant)
                .expiresAt(instant.plus(30, ChronoUnit.DAYS))
                .revoked(false)
                .user(user)
                .userAgent(request.getHeader("User-Agent"))
                .ipAddress(request.getRemoteAddr())
                .build();

        repository.save(refreshToken);

        return Map.of("refresh_token", rawToken);
    }


    public static String generateSecureToken() {
        byte[] randomBytes = new byte[32]; // 256-bit token
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

    public static String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return base64Encoder.encodeToString(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    public RefreshToken validateRefreshToken(String rawToken) {
        String hashedToken = hashToken(rawToken);

        return repository.findByToken(rawToken)
                .filter(token -> !token.isRevoked())
                .filter(token -> token.getExpiresAt().isAfter(Instant.now()))
                .orElseThrow(() -> new ExpiredRefreshTokenException("Invalid or expired refresh token"));
    }

    @Override
    public void revokeRefreshToken(String refreshToken) {
        var refreshTokenEntity = repository.findByToken(refreshToken)
                .orElseThrow(() -> new ResourceNotFoundException("Refresh token not found"));
        refreshTokenEntity.setRevoked(true);
        repository.save(refreshTokenEntity);
    }




}
