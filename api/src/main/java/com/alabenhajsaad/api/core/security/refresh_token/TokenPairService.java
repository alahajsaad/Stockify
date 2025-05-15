package com.alabenhajsaad.api.core.security.refresh_token;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenPairService {
    // In-memory map for demonstration. In production, use Redis or a database
    private final Map<String, TokenPair> tokenStore = new ConcurrentHashMap<>();

    @Data
    @AllArgsConstructor
    public static class TokenPair {
        private String accessToken; // Access token or its identifier/hash
        private String refreshToken;
        private LocalDateTime expiry; // Expiry time for cleanup
    }

    // Store a token pair
    public void storeTokenPair(String accessTokenId, String refreshToken, Duration refreshValidity) {
        LocalDateTime expiry = LocalDateTime.now().plus(refreshValidity);
        tokenStore.put(accessTokenId, new TokenPair(accessTokenId, refreshToken, expiry));

        // Optional: Schedule cleanup of expired tokens
        scheduleCleanup();
    }

    // Retrieve refresh token by access token ID
    public String getRefreshToken(String accessTokenId) {
        TokenPair pair = tokenStore.get(accessTokenId);
        if (pair != null && pair.getExpiry().isAfter(LocalDateTime.now())) {
            return pair.getRefreshToken();
        }
        return null;
    }

    // Update token pair when refreshing
    public void updateTokenPair(String oldAccessTokenId, String newAccessTokenId,
                                String newRefreshToken, Duration refreshValidity) {
        // Remove old mapping
        tokenStore.remove(oldAccessTokenId);

        // Store new mapping
        storeTokenPair(newAccessTokenId, newRefreshToken, refreshValidity);
    }

    // Cleanup expired tokens periodically
    private void scheduleCleanup() {
        // Implementation depends on your application framework
        // This could be a scheduled task that runs every hour
    }
}
