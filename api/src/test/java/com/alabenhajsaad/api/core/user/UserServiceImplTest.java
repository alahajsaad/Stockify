package com.alabenhajsaad.api.core.user;

import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.enums.EntityStatus;
import com.alabenhajsaad.api.core.user.dto.UserCreationDto;
import com.alabenhajsaad.api.core.user_account_activation.TokenService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class UserServiceImplTest {

    @Mock
    private PasswordEncoder passwordEncoder ;

    @Mock
    private TokenService tokenService ;

    @Mock
    private UserRepository repository ;


    AppUser existsAppUserNotActive = AppUser
            .builder()
            .id(1)
            .firstName("ala")
            .lastName("ben haj saad")
            .email("ala@gmail.com")
            .password("111111")
            .telegramId("tyruudode")
            .status(EntityStatus.INACTIVE)
            .build();

    // tester le cas ou le compte de l'administrateur existe mais n'est pas valider
    // la fonction doit envoyer un mail contient le code d'activation
    // et enregistrer ce code d'activation dans la base de donnee
    @Test
    void createAdminAccount_alredyExistsButNotVerified() {
        UserCreationDto userCreationDto = UserCreationDto
                .builder()
                .firstName("ala")
                .lastName("ben haj saad")
                .email("ala@gmail.com")
                .password("111111")
                .telegramId("tyruudode")
                .build();

        when(repository.findById(1)).thenReturn(Optional.of(existsAppUserNotActive));


    }
}