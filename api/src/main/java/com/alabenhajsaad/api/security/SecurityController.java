package com.alabenhajsaad.api.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

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
    public Map<String,String> login(@RequestParam String username ,@RequestParam String password){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username,password)
        );
        return jwtService.generateToken(authentication) ;
    }
//    @PostMapping("/login")
//    public Authentication  login(@RequestParam String username ,@RequestParam String password){
//        return authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(username,password)
//        );
//    }
}
