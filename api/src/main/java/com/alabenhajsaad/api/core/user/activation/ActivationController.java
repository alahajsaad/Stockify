package com.alabenhajsaad.api.core.user.activation;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
