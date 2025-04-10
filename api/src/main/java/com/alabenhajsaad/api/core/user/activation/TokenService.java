package com.alabenhajsaad.api.core.user.activation;

import com.alabenhajsaad.api.core.user.AppUser;

public interface TokenService {
    void activateAccount(String token);
    void sendValidationEmail(AppUser user);
}
