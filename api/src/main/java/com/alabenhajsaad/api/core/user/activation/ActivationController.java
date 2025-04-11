package com.alabenhajsaad.api.core.user.activation;

import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.core.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/accountActivation")
public class ActivationController {
    private final TokenService tokenService;
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> accountActivation(@RequestParam("token") String token) {
        tokenService.activateAccount(token);
        return ResponseEntity.ok(ApiResponse.success(null,"Compte activé avec succès"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Void>> getActivation(@RequestBody AppUser user) {
        tokenService.sendValidationEmail(user);
        return ResponseEntity.ok(ApiResponse.success(null, "Un nouveau code d'activation a été envoyé à votre adresse e-mail."));

    }
}
