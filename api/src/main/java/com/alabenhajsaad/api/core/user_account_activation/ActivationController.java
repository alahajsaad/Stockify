package com.alabenhajsaad.api.core.user_account_activation;

import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.dto.UserResponseDto;
import jakarta.ws.rs.PathParam;
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


}
