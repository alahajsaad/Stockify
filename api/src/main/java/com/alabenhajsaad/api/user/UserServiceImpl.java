package com.alabenhajsaad.api.user;


import com.alabenhajsaad.api.company.Company;
import com.alabenhajsaad.api.enums.EntityStatus;
import com.alabenhajsaad.api.enums.Role;
import com.alabenhajsaad.api.exception.ConflictException;

import com.alabenhajsaad.api.user.activation.TokenService;
import com.alabenhajsaad.api.user.dto.UserCreationDto;
import com.alabenhajsaad.api.user.dto.UserResponseDto;
import com.alabenhajsaad.api.user.dto.UserUpdateHigthLevelDto;
import com.alabenhajsaad.api.user.mapper.UserMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository ;
    private final PasswordEncoder passwordEncoder ;
    private final UserMapper mapper ;
    private final TokenService tokenService ;
    // This service is used to avoid the circular dependency issue
    // (CompanyService depends on UserService and vice versa).
    private final UserCompanyRelationService companyService ;

    @Override
    @Transactional
    public AppUser createAdminAccount(UserCreationDto dto) {
        AppUser user = mapper.toUser(dto);
        if(Boolean.TRUE.equals(repository.existsByEmail(user.getEmail())) ){
            throw new ConflictException("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ADMIN);
        user.setStatus(EntityStatus.INACTIVE);
        var savedUser = repository.save(user);
        tokenService.sendValidationEmail(savedUser);
        return savedUser;
    }
    @Override
    @Transactional
    // This function is used by the company admin to add a new employee.
    // It adds a new employee along with their company and updates the number of users in the company.
    public AppUser createEmployeeAccount(UserCreationDto dto , Integer companyId) {
        AppUser user = mapper.toUser(dto);
        if(repository.existsByEmail(user.getEmail()) || repository.existsByTelegramId(user.getTelegramId())){
            throw new ConflictException("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.EMPLOYEE);
        user.setStatus(EntityStatus.ACTIVE);
        Company company = companyService.getCompanyById(companyId);
        user.setCompany(company);
        user.setTenantId(company.getTenantId());
        companyService.updateNumberOfUserOfCompany(company);

        return repository.save(user);
    }

    @Override
    // This function is used by the user to update their information.
    // It is a low-level function because it cannot update the state or role.
    public UserResponseDto updateUserLowLevel(UserCreationDto dto) {
        AppUser existingUser = getUserById(dto.id());

        if(dto.password() != null && !passwordEncoder.matches(dto.password(), existingUser.getPassword())){
            existingUser.setPassword(passwordEncoder.encode(dto.password()));
        }
        mapper.updateUserFromCreationDto(dto, existingUser);

        return mapper.toUserResponseDto(repository.save(existingUser));
    }

    @Override
    // This function allows the company admin to update the state of a company employee
    // and potentially their role in the future.
    public UserResponseDto updateUserHighLevel(UserUpdateHigthLevelDto dto) {
        AppUser existingUser = getUserById(dto.id());
        mapper.updateUserFromHighLevelDto(dto, existingUser);
        return mapper.toUserResponseDto(repository.save(existingUser));
    }



    @Override
    public List<UserResponseDto> getUsersByCompany(Integer companyId) {
        if (Boolean.FALSE.equals(companyService.exsitsCompanyById(companyId))) {
            throw new EntityNotFoundException("Company does not exist");
        }

        List<AppUser> users = repository.findUsersByCompany_Id(companyId);
        if (users.isEmpty()) {
            return Collections.emptyList();
        }

        return users.stream()
                .map(mapper::toUserResponseDto)
                .toList();
    }

    @Override
    public AppUser getUserById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }


}
