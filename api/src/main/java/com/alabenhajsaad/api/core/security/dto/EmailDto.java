package com.alabenhajsaad.api.core.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailDto(
        @Email(message = "Format d'adresse e-mail invalide")
        @NotBlank(message = "L'adresse e-mail est obligatoire")
        String email
) {}
