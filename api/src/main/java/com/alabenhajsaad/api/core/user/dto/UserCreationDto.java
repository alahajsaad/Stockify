package com.alabenhajsaad.api.core.user.dto;

import lombok.Builder;

@Builder
public record UserCreationDto(
        Integer id ,
        String firstName,
        String lastName,
        String email,
        String password,
        String telegramId

) {
}
