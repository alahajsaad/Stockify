package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.core.security.dto.LoginRequest;
import com.alabenhajsaad.api.core.security.refresh_token.RefreshToken;
import com.alabenhajsaad.api.core.security.refresh_token.RefreshTokenService;
import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.UserService;
import com.alabenhajsaad.api.email.EmailService;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SecurityServiceImpl implements SecurityService{
    private final RefreshTokenService refreshTokenService ;
    private final AccessTokenService accessTokenService ;
    private final UserService userService ;
    private final AuthenticationManager authenticationManager ;
    private final EmailService emailService ;

    @Override
    public Map<String, String> generateNewAccessToken(String refreshToken) {
        var validatedRefreshToken = refreshTokenService.validateRefreshToken(refreshToken);
        return accessTokenService.generateAccessToken(validatedRefreshToken.getUser());
    }

    @Override
    public Map<String, String> login( LoginRequest loginRequest , HttpServletRequest servletRequest ) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password())
        );
        Map<String, String> result = new HashMap<>();

        var appUser = getUserFromAuthentication(authentication);


        result.putAll(accessTokenService.generateAccessToken(appUser));
        result.putAll(refreshTokenService.generateAndSaveRefreshToken(appUser,servletRequest));

        return result;
    }

    @Override
    public void logout(String refreshToken) {
        refreshTokenService.revokeRefreshToken(refreshToken);
    }

    @Override
    public void forgetPassword(String email) {
        var appUser = userService.getUserByEmail(email) ;

    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {

    }


    public AppUser getUserFromAuthentication(Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userService.getUserByEmail(userDetails.getUsername()) ;
    }

}
