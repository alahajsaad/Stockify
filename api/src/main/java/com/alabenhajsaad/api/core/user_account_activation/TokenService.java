package com.alabenhajsaad.api.core.user_account_activation;

import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.dto.UserResponseDto;

public interface TokenService {
    void activateAccount(String token);
    void sendValidationEmail(AppUser user);
}
