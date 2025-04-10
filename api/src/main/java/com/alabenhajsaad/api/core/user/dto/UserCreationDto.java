package com.alabenhajsaad.api.core.user.dto;

public record UserCreationDto(
        Integer id ,
        String firstName,
        String lastName,
        String email,
        String password,
        String telegramId

) {
}
