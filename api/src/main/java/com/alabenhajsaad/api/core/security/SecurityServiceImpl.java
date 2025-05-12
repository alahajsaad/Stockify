package com.alabenhajsaad.api.core.security;

import com.alabenhajsaad.api.core.security.dto.LoginRequest;
import com.alabenhajsaad.api.core.security.refresh_token.RefreshTokenService;
import com.alabenhajsaad.api.core.security.reset_token.PasswordResetRequestDto;
import com.alabenhajsaad.api.core.security.reset_token.ResetTokenService;
import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.UserService;
import com.alabenhajsaad.api.email.EmailService;
import com.alabenhajsaad.api.email.EmailTemplateName;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SecurityServiceImpl implements SecurityService{
    private final RefreshTokenService refreshTokenService ;
    private final AccessTokenService accessTokenService ;
    private final UserService userService ;
    private final AuthenticationManager authenticationManager ;
    private final EmailService emailService ;
    private final ResetTokenService resetTokenService ;
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
        String link = "http://localhost:5173/resetPassword?token=" + resetTokenService.generateAndCacheTokenOfValidation() + "&email=" + email;
        log.info("Generated reset password link: {}", link);
        emailService.sendResetPasswordEmail(
                appUser.getEmail(),
                "reset password",
                link,
                appUser.getFullName(),
                EmailTemplateName.RESET_PASSWORD
        );
    }
    @Override
    public void resetPassword(PasswordResetRequestDto dto) {
        if(!resetTokenService.validateToken(dto.token())){
            throw new SecurityException("Invalid token");
        }
        userService.changePassword(dto.email() , dto.password() , dto.confirmPassword());
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {

    }




    public AppUser getUserFromAuthentication(Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userService.getUserByEmail(userDetails.getUsername()) ;
    }

}
