package com.alabenhajsaad.api.core.user.dto;


import com.alabenhajsaad.api.core.enums.EntityStatus;
import com.alabenhajsaad.api.core.enums.Role;

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
