package com.alabenhajsaad.api.user.dto;


import com.alabenhajsaad.api.enums.EntityStatus;
import com.alabenhajsaad.api.enums.Role;

public record UserUpdateHigthLevelDto(
        Integer id ,
        String firstName,
        String lastName,
        String email,
        String telegramId,
        Role role,
        EntityStatus status
) {
}
