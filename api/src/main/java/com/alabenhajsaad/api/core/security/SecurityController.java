package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.core.security.dto.EmailDto;
import com.alabenhajsaad.api.core.security.dto.LoginRequest;
import com.alabenhajsaad.api.core.security.refresh_token.TokenPairService;
import com.alabenhajsaad.api.core.security.reset_token.PasswordResetRequestDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;


@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class SecurityController {

    private final SecurityService securityService ;
    private final TokenPairService tokenPairService ;

    @GetMapping("/profile")
    public Authentication profile(Authentication authentication){
        return authentication ;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(
            @RequestBody LoginRequest loginRequest,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        // Authenticate and generate tokens
        Map<String, String> tokens = securityService.login(loginRequest, request);
//
//        String accessToken = tokens.get("access_token");
//        String refreshToken = tokens.get("refresh_token");
//
//        // Extract access token ID (could be the token itself, a hash, or a claim from it)
//        String accessTokenId = securityService.extractTokenId(accessToken);
//
//        // Store the token pair
//        Duration refreshValidity = Duration.ofDays(7); // Match your cookie expiry
//        tokenPairService.storeTokenPair(accessTokenId, refreshToken, refreshValidity);
//
//        // Set refresh token in cookie
//        Cookie cookie = new Cookie("refresh_token", refreshToken);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
//        cookie.setPath("/api/auth/refresh");
//        cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
//
//        response.addCookie(cookie);
//
//        // Remove refresh token from response body
        tokens.remove("refresh_token");

        return ResponseEntity.ok(ApiResponse.success(tokens));
    }



    @PostMapping("/logout")
    public void logout(Authentication authentication) {

    }
    @PostMapping("/forgetPassword")
    public ResponseEntity<ApiResponse<Void>> forgetPassword(@RequestBody @Valid EmailDto emailDto) {
        securityService.forgetPassword(emailDto.email());
        return ResponseEntity.ok(
                ApiResponse.success(null, "Veuillez consulter votre boîte e-mail pour créer un nouveau mot de passe.")
        );
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody PasswordResetRequestDto passwordResetRequestDto) {
        securityService.resetPassword(passwordResetRequestDto);
        return ResponseEntity.ok(
                ApiResponse.success(null, "Votre mot de passe a été changé avec succès. Veuillez vous connecter.")
        );
    }


//    @PostMapping("/refresh")
//    public ResponseEntity<ApiResponse<Map<String, String>>> refreshToken(
//            @RequestParam String expiredAccessToken,
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) {
//        try {
//            // Extract access token ID from the expired token
//            String accessTokenId = securityService.extractTokenId(expiredAccessToken);
//
//            // Get the corresponding refresh token from our mapping
//            String expectedRefreshToken = tokenPairService.getRefreshToken(accessTokenId);
//
//            if (expectedRefreshToken == null) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body(ApiResponse.error("No valid refresh token found for this session"));
//            }
//
//            // Get actual refresh token from cookie
//            Cookie[] cookies = request.getCookies();
//            String actualRefreshToken = null;
//
//            if (cookies != null) {
//                for (Cookie cookie : cookies) {
//                    if ("refresh_token".equals(cookie.getName())) {
//                        actualRefreshToken = cookie.getValue();
//                        break;
//                    }
//                }
//            }
//
//            // Verify the refresh token from cookie matches the one in our mapping
//            if (actualRefreshToken == null || !expectedRefreshToken.equals(actualRefreshToken)) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body(ApiResponse.error("Invalid refresh token"));
//            }
//
//            // Generate new tokens
//            Map<String, String> newTokens = securityService.generateNewAccessToken(actualRefreshToken);
//
//            // Extract new token values
//            String newAccessToken = newTokens.get("access_token");
//            String newRefreshToken = newTokens.getOrDefault("refresh_token", actualRefreshToken);
//
//            // Extract new access token ID
//            String newAccessTokenId = securityService.extractTokenId(newAccessToken);
//
//            // Update token pair in storage
//            tokenPairService.updateTokenPair(
//                    accessTokenId,
//                    newAccessTokenId,
//                    newRefreshToken,
//                    Duration.ofDays(7)
//            );
//
//            // Update refresh token cookie if a new one was generated
//            if (newTokens.containsKey("refresh_token")) {
//                Cookie cookie = new Cookie("refresh_token", newRefreshToken);
//                cookie.setHttpOnly(true);
//                cookie.setSecure(true);
//                cookie.setPath("/api/auth/refresh");
//                cookie.setMaxAge(7 * 24 * 60 * 60);
//
//                response.addCookie(cookie);
//
//                // Remove refresh token from response body
//                newTokens.remove("refresh_token");
//            }
//
//            return ResponseEntity.ok(ApiResponse.success(newTokens));
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(ApiResponse.error("Failed to refresh token: " + e.getMessage()));
//        }
//    }

}
