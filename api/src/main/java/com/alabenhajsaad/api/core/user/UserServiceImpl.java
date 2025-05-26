package com.alabenhajsaad.api.core.user;


import com.alabenhajsaad.api.core.company.Company;
import com.alabenhajsaad.api.core.datasource_config.datasource.DataSourceService;
import com.alabenhajsaad.api.core.datasource_config.multitenant.DynamicDataSourceService;
import com.alabenhajsaad.api.core.exception.InactiveUserExistsException;
import com.alabenhajsaad.api.core.user_account_activation.TokenService;
import com.alabenhajsaad.api.core.user.mapper.UserMapper;
import com.alabenhajsaad.api.core.enums.EntityStatus;
import com.alabenhajsaad.api.core.enums.Role;
import com.alabenhajsaad.api.core.exception.ConflictException;

import com.alabenhajsaad.api.core.user.dto.UserCreationDto;
import com.alabenhajsaad.api.core.user.dto.UserResponseDto;
import com.alabenhajsaad.api.core.user.dto.UserUpdateHigthLevelDto;
import com.alabenhajsaad.api.core.utils.CodeGenerator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final DynamicDataSourceService dynamicDataSourceService;
    private final DataSourceService dataSourceService ;
    @Value("${database.tenant.prefix}")
    private String dbPrefix;

    @Override
    @Transactional(dontRollbackOn = InactiveUserExistsException.class)
    public UserResponseDto createAdminAccount(UserCreationDto dto) {
        Optional<AppUser> optionalUser = repository.findByEmail(dto.email());

        if (optionalUser.isPresent()) {
            AppUser savedUser = optionalUser.get();

            if (savedUser.getStatus() == EntityStatus.INACTIVE) {
                tokenService.sendValidationEmail(savedUser);
                throw new InactiveUserExistsException("Le compte existe mais n'est pas actif.");
            }
            throw new ConflictException("Vous avez déjà un compte administrateur.");
        }
        // Generate tenant ID and set it
        String tenantId = CodeGenerator.generateBase64TenantId();
        // Construct the database URL dynamically
        String databaseUrl = dbPrefix + tenantId + "?createDatabaseIfNotExist=true";

        AppUser user = mapper.toUser(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ADMIN);
        user.setStatus(EntityStatus.INACTIVE);
        user.setTenantId(tenantId);

        try {
            // Register new tenant
            dynamicDataSourceService.registerTenant(tenantId, databaseUrl);
            dataSourceService.addDataSource(tenantId,databaseUrl);

        } catch (Exception e) {
            // Log the error and handle rollback properly
            log.error("Failed to register tenant {}: {}", tenantId, e.getMessage(), e);
            throw new RuntimeException("Error during registring the db, please try again.");
        }

        var savedUser = repository.save(user);

        tokenService.sendValidationEmail(savedUser);
        return mapper.toUserResponseDto(savedUser);
    }
    @Override
    @Transactional
    public AppUser createEmployeeAccount(UserCreationDto dto , Integer companyId) {
        if(Boolean.TRUE.equals(repository.existsByEmail(dto.email()))){
            throw new ConflictException("cette employee a deja un compte avec l'adress email :"+dto.email());
        }

        AppUser user = mapper.toUser(dto);
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

        List<AppUser> users = Optional.ofNullable(repository.findUsersByCompany_Id(companyId))
                .orElse(Collections.emptyList());

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
                orElseThrow(() -> new EntityNotFoundException("Adresse email incorrect."));
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
