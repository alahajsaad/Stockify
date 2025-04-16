package com.alabenhajsaad.api.core.security.refresh_token;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository repository ;

    public void addRefreshToken(RefreshToken refreshToken) {
        repository.save(refreshToken);
    }
    public void revokeRefreshToken(RefreshToken refreshToken) {

    }

}
