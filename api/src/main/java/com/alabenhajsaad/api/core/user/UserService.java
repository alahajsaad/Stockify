package com.alabenhajsaad.api.core.user;


import com.alabenhajsaad.api.core.user.dto.UserCreationDto;
import com.alabenhajsaad.api.core.user.dto.UserResponseDto;
import com.alabenhajsaad.api.core.user.dto.UserUpdateHigthLevelDto;

import java.util.List;

public interface UserService {
    UserResponseDto createAdminAccount(UserCreationDto dto);
    AppUser createEmployeeAccount(UserCreationDto dto , Integer companyId);
    UserResponseDto updateUserLowLevel(UserCreationDto dto);
    UserResponseDto updateUserHighLevel(UserUpdateHigthLevelDto dto);
    List<UserResponseDto> getUsersByCompany(Integer companyId);
    AppUser getUserById(Integer id);
    AppUser getUserByEmail(String email);

    UserResponseDto getUserDetailsById(Integer id);

}
