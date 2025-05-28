package com.alabenhajsaad.api.core.security;


import com.alabenhajsaad.api.core.security.dto.LoginRequest;
import com.alabenhajsaad.api.core.security.dto.PasswordResetRequestDto;
import com.alabenhajsaad.api.core.security.dto.UpdatePasswordRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface SecurityService {
    Map<String,String> generateNewAccessToken(String refreshToken);
    Map<String, String> login(LoginRequest loginRequest ,HttpServletRequest servletRequest );
    void logout(String refreshToken);
    void forgetPassword(String email);
    void updatePassword(UpdatePasswordRequest updatePasswordRequest);
    void resetPassword(PasswordResetRequestDto resetTokenDto);
}
