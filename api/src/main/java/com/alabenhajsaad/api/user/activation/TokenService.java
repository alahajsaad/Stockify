package com.alabenhajsaad.api.user.activation;

import com.alabenhajsaad.api.user.AppUser;

public interface TokenService {
    void activateAccount(String token);
    void sendValidationEmail(AppUser user);
}
