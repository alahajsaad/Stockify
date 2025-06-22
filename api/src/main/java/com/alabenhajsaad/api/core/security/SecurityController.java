package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.core.exception.ExpiredRefreshTokenException;
import com.alabenhajsaad.api.core.security.dto.EmailDto;
import com.alabenhajsaad.api.core.security.dto.LoginRequest;
import com.alabenhajsaad.api.core.security.dto.PasswordResetRequestDto;
import com.alabenhajsaad.api.core.security.dto.UpdatePasswordRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;


@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class SecurityController {

    private final SecurityService securityService ;
    @Value("${spring.profiles.active:dev}")
    private String activeProfile;
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

        String refreshToken = tokens.get("refresh_token");

        // Determine cookie security settings based on environment
        boolean isProduction = "prod".equalsIgnoreCase(activeProfile);

        // Construct cookie dynamically based on profile
        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
               // .secure(isProduction) // secure=true only in production (requires HTTPS)
                .path("/api/v1/auth")
                .maxAge(Duration.ofDays(7))
               // .sameSite(isProduction ? "None" : "Lax") // SameSite=None for cross-origin in prod, Lax for localhost
                .build();

        // Add cookie to response
        response.setHeader("Set-Cookie", cookie.toString());

        // Remove refresh token from response body
        tokens.remove("refresh_token");

        return ResponseEntity.ok(ApiResponse.success(tokens));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String actualRefreshToken = null;
        // Extract the refresh token from cookies
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    actualRefreshToken = cookie.getValue();
                    log.info("Refresh token: {}", actualRefreshToken);
                    break;
                }
            }
        }
        securityService.logout(actualRefreshToken);
        return ResponseEntity.ok(
                ApiResponse.success(null, "session terminée")
        );
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

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String, String>>> refreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String actualRefreshToken = null;
        log.info("cookies: {}", cookies);
        // Extract the refresh token from cookies
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    actualRefreshToken = cookie.getValue();
                    log.info("Refresh token: {}", actualRefreshToken);
                    break;
                }
            }
        }

        // If token not found in cookies
        if (actualRefreshToken == null || actualRefreshToken.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Refresh token is missing"));
        }

        try {
            // Generate new access token using the refresh token
            Map<String, String> newToken = securityService.generateNewAccessToken(actualRefreshToken);
            return ResponseEntity.ok(ApiResponse.success(newToken,"new access token generated"));

        } catch (ExpiredRefreshTokenException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Refresh token expired"));

        } catch (JwtException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid refresh token"));

        } catch (Exception ex) {
            // Catch any other unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("An unexpected error occurred: " + ex.getMessage()));
        }
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<ApiResponse<Void>> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        securityService.updatePassword(updatePasswordRequest);
        return ResponseEntity.ok(
                ApiResponse.success(null, "Votre mot de passe a été mis à jour avec succès.")
        );
    }




}
