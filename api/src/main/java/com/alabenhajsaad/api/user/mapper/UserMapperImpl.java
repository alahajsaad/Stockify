package com.alabenhajsaad.api.user.mapper;


import com.alabenhajsaad.api.user.AppUser;
import com.alabenhajsaad.api.user.dto.UserCreationDto;
import com.alabenhajsaad.api.user.dto.UserResponseDto;
import com.alabenhajsaad.api.user.dto.UserUpdateHigthLevelDto;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
public class UserMapperImpl implements UserMapper{

    public AppUser toUser(UserCreationDto dto){
        return AppUser.builder()
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .email(dto.email())
                .password(dto.password())
                .telegramId(dto.telegramId())
                .build();
    }

    @Override
    public void updateUserFromCreationDto(UserCreationDto dto, AppUser existingUser) {
        updateIfNotNull(dto.firstName(), existingUser::setFirstName);
        updateIfNotNull(dto.lastName(), existingUser::setLastName);
        updateIfNotNull(dto.email(), existingUser::setEmail);
        updateIfNotNull(dto.telegramId(), existingUser::setTelegramId);
    }

    @Override
    public void updateUserFromHighLevelDto(UserUpdateHigthLevelDto dto, AppUser existingUser) {
        updateIfNotNull(dto.firstName(), existingUser::setFirstName);
        updateIfNotNull(dto.lastName(), existingUser::setLastName);
        updateIfNotNull(dto.email(), existingUser::setEmail);
        updateIfNotNull(dto.telegramId(), existingUser::setTelegramId);
        updateIfNotNull(dto.status(), existingUser::setStatus);
        updateIfNotNull(dto.role(), existingUser::setRole);
    }

    private <T> void updateIfNotNull(T value, Consumer<T> setter) {
        if (value != null) {
            setter.accept(value);
        }
    }



    @Override
    public UserResponseDto toUserResponseDto(AppUser user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .telegramId(user.getTelegramId())
                .status(user.getStatus())
                .role(user.getRole())
                .companyId(user.getCompanyId())
                .build();
    }


}
