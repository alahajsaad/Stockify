package com.alabenhajsaad.api.core.user_account_activation;


import com.alabenhajsaad.api.core.utils.CodeGenerator;
import com.alabenhajsaad.api.email.EmailService;
import com.alabenhajsaad.api.email.EmailTemplateName;
import com.alabenhajsaad.api.core.enums.EntityStatus;
import com.alabenhajsaad.api.core.exception.TokenHasExpiredException;
import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
    private final TokenRepository repository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Transactional(noRollbackFor = TokenHasExpiredException.class)
    public void activateAccount(String token) {
        // 1. Récupérer le token
        Token savedToken = repository.findByToken(token)
                .orElseThrow(() -> new NotFoundException("Invalid token"));

        // 2. Récupérer l'utilisateur depuis le token (pas besoin de chercher par email)
        AppUser tokenUser = savedToken.getUser();

        // 3. Vérifier si le token a expiré
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            repository.delete(savedToken);
            sendValidationEmail(tokenUser);
            throw new TokenHasExpiredException("Le jeton d'activation a expiré. Un nouveau jeton a été envoyé à la même adresse e-mail.");
        }

        // 4. Vérifier si le token n'a pas déjà été utilisé
        if (savedToken.getValidatedAt() != null) {
            throw new IllegalStateException("Ce token a déjà été utilisé");
        }

        // 5. Activer l'utilisateur
        tokenUser.setStatus(EntityStatus.ACTIVE);
        userRepository.save(tokenUser);

        // 6. Marquer le token comme validé
        savedToken.setValidatedAt(LocalDateTime.now());
        repository.save(savedToken);
    }

    private String generateAndSaveActivationToken(AppUser user) {
        // Generate a token
        String generatedToken = CodeGenerator.generate(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        repository.save(token);

        return generatedToken;
    }

    public void sendValidationEmail(AppUser user)  {
        var newActivationToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                "Account activation",
                newActivationToken,
                user.getFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT
        );
    }

}
