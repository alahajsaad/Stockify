package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.core.enums.Role;
import com.alabenhajsaad.api.core.user.AppUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccessTokenService {
    private final JwtDecoder jwtDecoder;
    private final JwtEncoder jwtEncoder;
    public static final String ROLE_PREFIX = "ROLE_";
    public Map<String,String> generateAccessToken(AppUser user) {
        Instant now = Instant.now();
        JwtClaimsSet.Builder claimsBuilder = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(now.plus(15, ChronoUnit.DAYS)) // Consider refresh tokens
                .subject(user.getUsername())
                .claim("id",user.getId())
                .claim("fullName", user.getFullName())
                .claim("companyId", user.getCompany() != null && user.getCompany().getId() != null ? user.getCompany().getId() : 0L)

                .claim("scope", ROLE_PREFIX + user.getRole());

        if (user.getRole() != Role.SUPER_ADMIN) {
            claimsBuilder.claim("tenantId", user.getTenantId());


        }

        JwtClaimsSet claims = claimsBuilder.build();

        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS512).build(),
                claims
        );

        String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();

        return Map.of("access_token", jwt);
    }




    public String getTenantIdFromToken(String token) {
        try {
            Jwt jwt = jwtDecoder.decode(token);
            return jwt.getClaimAsString("tenantId");
        } catch (Exception e) {
            log.error("error from access token service : {}", e.getMessage());
            return null;
        }
    }
    public boolean isSuperAdminToken(String token) {
        try {
            Jwt jwt = jwtDecoder.decode(token);
            return "ROLE_SUPER_ADMIN".equals(jwt.getClaimAsString("scope"));
        } catch (JwtException e) {
            log.warn("Token decoding failed: {}", e.getMessage());
            throw e;
        }
    }

}
