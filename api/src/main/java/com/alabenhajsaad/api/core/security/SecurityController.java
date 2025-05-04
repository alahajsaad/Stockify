package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.core.security.dto.LoginRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class SecurityController {

    private final SecurityService securityService ;

    @GetMapping("/profile")
    public Authentication profile(Authentication authentication){
        return authentication ;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(@RequestBody LoginRequest loginRequest, HttpServletRequest servletRequest) {
        return ResponseEntity.ok(
                ApiResponse.success(securityService.login(loginRequest, servletRequest))
        );
    }


    @PostMapping("/logout")
    public void logout(Authentication authentication) {

    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String,String>>> generateNewAccessToken(@RequestParam String refreshToken){
        return ResponseEntity.ok(
                ApiResponse.success(securityService.generateNewAccessToken(refreshToken))
        );
    }

}
