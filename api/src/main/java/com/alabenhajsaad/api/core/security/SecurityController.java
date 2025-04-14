package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class SecurityController {
    private final AuthenticationManager authenticationManager ;
    private final JwtService jwtService ;

    @GetMapping("/profile")
    public Authentication profile(Authentication authentication){
        return authentication ;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String,String>>> login(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(),loginRequest.password())
        );
        return ResponseEntity.ok(ApiResponse.success(jwtService.generateToken(authentication)));

    }

}
