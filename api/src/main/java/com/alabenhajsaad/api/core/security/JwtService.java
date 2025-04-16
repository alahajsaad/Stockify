package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.core.security.refresh_token.RefreshToken;
import com.alabenhajsaad.api.core.security.refresh_token.RefreshTokenService;
import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final JwtDecoder jwtDecoder;
    private final JwtEncoder jwtEncoder;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    public Map<String,String> generateAccessToken(Authentication authentication) {
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();


        AppUser user = userService.getUserByEmail(userDetails.getUsername()) ;
        Instant instant = Instant.now();

        // Utiliser claims() pour ajouter plusieurs revendications
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .issuedAt(instant)
                .expiresAt(instant.plus(1, ChronoUnit.DAYS))
                .subject(user.getUsername())
                .claim("scope", scope)                // Ajouter scope comme une revendication distincte
                .claim("tenantId", user.getTenantId()) // Ajouter tenantId comme une revendication distincte
                .build();

        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS512).build(),
                jwtClaimsSet
        );

        String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();

        return Map.of("access_token", jwt);
    }

    public Map<String,String> generateRefreshToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        AppUser user = userService.getUserByEmail(userDetails.getUsername()) ;

        Instant instant = Instant.now();
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .subject(userDetails.getUsername())
                .issuedAt(instant)
                .expiresAt(instant.plus(30, ChronoUnit.DAYS))
                .build();
        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS512).build(),
                jwtClaimsSet
        );

        String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
        refreshTokenService.addRefreshToken(
                RefreshToken.builder()
                        .token(jwt)
                        .issuedAt(instant)
                        .revoked(false)
                        .issuedAt(instant.plus(30, ChronoUnit.DAYS))
                        .user(user)
                        .build()
        );
        return Map.of("refresh_token", jwt);
    }

    public Map<String, String> login(Authentication authentication) {
        Map<String, String> result = new HashMap<>();
        result.putAll(generateAccessToken(authentication));
        result.putAll(generateRefreshToken(authentication));
        return result;
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
