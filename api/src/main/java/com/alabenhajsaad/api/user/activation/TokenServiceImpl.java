package com.alabenhajsaad.api.user.activation;

import com.alabenhajsaad.api.email.EmailService;
import com.alabenhajsaad.api.email.EmailTemplateName;
import com.alabenhajsaad.api.enums.EntityStatus;
import com.alabenhajsaad.api.exception.TokenHasExpiredException;
import com.alabenhajsaad.api.user.AppUser;
import com.alabenhajsaad.api.user.UserRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.security.SecureRandom;
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

        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new TokenHasExpiredException("Activation token has expired. A new token has been send to the same email address");
        }

        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setStatus(EntityStatus.ACTIVE);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        repository.save(savedToken);
    }

    private String generateAndSaveActivationToken(AppUser user) {
        // Generate a token
        String generatedToken = generateActivationCode(6);
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

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }
}
