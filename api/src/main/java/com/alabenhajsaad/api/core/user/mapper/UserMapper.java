package com.alabenhajsaad.api.core.user.mapper;

import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.dto.UserCreationDto;
import com.alabenhajsaad.api.core.user.dto.UserResponseDto;
import com.alabenhajsaad.api.core.user.dto.UserUpdateHigthLevelDto;

public interface UserMapper {
    AppUser toUser(UserCreationDto dto);
    AppUser toUser(UserResponseDto dto);
    UserResponseDto toUserResponseDto(AppUser user);
    void updateUserFromCreationDto(UserCreationDto dto, AppUser existingUser);
    void updateUserFromHighLevelDto(UserUpdateHigthLevelDto dto, AppUser existingUser) ;
}
