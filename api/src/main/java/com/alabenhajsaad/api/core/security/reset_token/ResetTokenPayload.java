package com.alabenhajsaad.api.core.security.reset_token;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResetTokenPayload {
    private String userId;
    private Instant issuedAt;
    private Instant expiresAt;
}

