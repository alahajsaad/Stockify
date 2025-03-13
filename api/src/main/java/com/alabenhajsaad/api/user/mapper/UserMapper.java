package com.alabenhajsaad.api.user.mapper;

import com.alabenhajsaad.api.user.AppUser;
import com.alabenhajsaad.api.user.dto.UserCreationDto;
import com.alabenhajsaad.api.user.dto.UserResponseDto;
import com.alabenhajsaad.api.user.dto.UserUpdateHigthLevelDto;

public interface UserMapper {
    AppUser toUser(UserCreationDto dto);
    UserResponseDto toUserResponseDto(AppUser user);
    void updateUserFromCreationDto(UserCreationDto dto, AppUser existingUser);
    void updateUserFromHighLevelDto(UserUpdateHigthLevelDto dto, AppUser existingUser) ;
}
