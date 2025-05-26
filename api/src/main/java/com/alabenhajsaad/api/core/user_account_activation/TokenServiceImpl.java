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
        Token savedToken = repository.findByToken(token)
                .orElseThrow(() -> new NotFoundException("Invalid token"));

        //If the token has expired
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            repository.delete(savedToken);
            sendValidationEmail(savedToken.getUser());
            throw new TokenHasExpiredException("Le jeton d'activation a expiré. Un nouveau jeton a été envoyé à la même adresse e-mail.");
        }


        var user = savedToken.getUser();
        user.setStatus(EntityStatus.ACTIVE);
        userRepository.save(user);

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
