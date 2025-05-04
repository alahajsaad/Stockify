package com.alabenhajsaad.api.core.security;


import com.alabenhajsaad.api.core.security.dto.LoginRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

import java.util.Map;

public interface SecurityService {
    Map<String,String> generateNewAccessToken(String refreshToken);
    Map<String, String> login(LoginRequest loginRequest ,HttpServletRequest servletRequest );
    void logout(String refreshToken);
    void forgetPassword(String email);
    void changePassword(String oldPassword, String newPassword);
}
