package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.core.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccessTokenService {
    private final JwtDecoder jwtDecoder;
    private final JwtEncoder jwtEncoder;

    public Map<String,String> generateAccessToken(AppUser user) {
        Instant instant = Instant.now();

        // Utiliser claims() pour ajouter plusieurs revendications
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .issuedAt(instant)
                .expiresAt(instant.plus(5, ChronoUnit.DAYS))
                .subject(user.getUsername())
                .claim("fullName", user.getFullName())
                .claim("scope", "ROLE_" + user.getRole())                // Ajouter scope comme une revendication distincte
                .claim("tenantId", user.getTenantId()) // Ajouter tenantId comme une revendication distincte
                .build();

        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS512).build(),
                jwtClaimsSet
        );

        String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();

        return Map.of("access_token", jwt);
    }




    public String getTenantIdFromToken(String token) {
        try {
            // todo : what does this line .decode ?
            Jwt jwt = jwtDecoder.decode(token);
            return jwt.getClaimAsString("tenantId");
        } catch (Exception e) {
            // Consider logging the exception here
            return null;
        }
    }
}
