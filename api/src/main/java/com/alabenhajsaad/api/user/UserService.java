package com.alabenhajsaad.api.user;


import com.alabenhajsaad.api.user.dto.UserCreationDto;
import com.alabenhajsaad.api.user.dto.UserResponseDto;
import com.alabenhajsaad.api.user.dto.UserUpdateHigthLevelDto;

import java.util.List;

public interface UserService {
    AppUser createAdminAccount(UserCreationDto dto);
    AppUser createEmployeeAccount(UserCreationDto dto , Integer companyId);
    UserResponseDto updateUserLowLevel(UserCreationDto dto);
    UserResponseDto updateUserHighLevel(UserUpdateHigthLevelDto dto);
    List<UserResponseDto> getUsersByCompany(Integer companyId);
    AppUser getUserById(Integer id);


}
