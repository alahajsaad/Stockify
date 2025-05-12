package com.alabenhajsaad.api.core.user;


import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.user_account_activation.TokenService;
import com.alabenhajsaad.api.core.user.mapper.UserMapper;
import com.alabenhajsaad.api.core.enums.EntityStatus;
import com.alabenhajsaad.api.core.enums.Role;
import com.alabenhajsaad.api.core.exception.ConflictException;

import com.alabenhajsaad.api.core.user.dto.UserCreationDto;
import com.alabenhajsaad.api.core.user.dto.UserResponseDto;
import com.alabenhajsaad.api.core.user.dto.UserUpdateHigthLevelDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository repository ;
    private final PasswordEncoder passwordEncoder ;
    private final UserMapper mapper ;
    private final TokenService tokenService ;
    private final UserCompanyRelationService companyService ;

    @Override
    @Transactional
    public UserResponseDto createAdminAccount(UserCreationDto dto) {


        Optional<AppUser> existingUserOptional = repository.findByEmail(dto.email());

        if (existingUserOptional.isPresent()) {
            AppUser existingUser = existingUserOptional.get();

            // Null-safe company check
            boolean hasCompany = existingUser.getCompany() != null &&
                    existingUser.getCompany().getId() != null;

            if (existingUser.getStatus() == EntityStatus.ACTIVE) {
                if (hasCompany) {
                    throw new ConflictException("User with email already has a company");
                }
                throw new ConflictException("User with email already has an active account");
            }

            // For inactive users
            tokenService.sendValidationEmail(existingUser);
            throw new ConflictException("User with email exists. Validation email sent.");
        }

        AppUser user = mapper.toUser(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ADMIN);
        user.setStatus(EntityStatus.INACTIVE);
        var savedUser = repository.save(user);

        tokenService.sendValidationEmail(savedUser);
        return mapper.toUserResponseDto(savedUser);
    }
    @Override
    @Transactional
    // This function is used by the company admin to add a new employee.
    // It adds a new employee along with their company and updates the number of users in the company.
    public AppUser createEmployeeAccount(UserCreationDto dto , Integer companyId) {
        AppUser user = mapper.toUser(dto);
        if(repository.existsByEmail(user.getEmail()) || repository.existsByTelegramId(user.getTelegramId())){
            throw new ConflictException("L'utilisateur existe déjà",repository.findByEmail(user.getEmail()).get().getId());
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

    @Override
    public AppUser getUserByEmail(String email) {
        return repository.findByEmail(email).
                orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public void changePassword(String email, String password , String confirmPassword) {
        if(!password.equals(confirmPassword)){
            throw new RuntimeException("Passwords do not match");
        }
        var user  = getUserByEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        repository.save(user);
    }


    @Override
    public UserResponseDto getUserDetailsById(Integer id) {
        return mapper.toUserResponseDto(getUserById(id));
    }

    @Override
    public UserResponseDto findUserByEmail(String email) {
        var user = repository.findByEmail(email).
                orElseThrow(() -> new EntityNotFoundException("User not found"));
        return mapper.toUserResponseDto(user);
    }


}
