package com.alabenhajsaad.api.user;

import com.alabenhajsaad.api.enums.EntityStatus;
import com.alabenhajsaad.api.enums.Role;
import com.alabenhajsaad.api.exception.ConflictException;
import com.alabenhajsaad.api.user.activation.TokenService;
import com.alabenhajsaad.api.user.dto.UserCreationDto;
import com.alabenhajsaad.api.user.mapper.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

//@ExtendWith(MockitoExtension.class)
//class UserServiceImplTest {
//
//    @InjectMocks
//    private UserServiceImpl userService;
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @Mock
//    private UserMapper userMapper;
//
//    @Mock
//    private TokenService tokenService;
//
//    @Mock
//    private UserCompanyRelationService companyService;
//
//    private UserCreationDto userCreationDto;
//    private AppUser appUser;
//
//    @BeforeEach
//    public void setUp() {
//        // Set up test data
//        userCreationDto = new UserCreationDto(null,"ala" ,"haj saad",
//                "alahajsaad@gmail.com",
//                "1234",
//                "2323432");
//
//
//        appUser =  AppUser.builder()
//                .firstName(userCreationDto.firstName())
//                .lastName(userCreationDto.lastName())
//                .email(userCreationDto.email())
//                .password(userCreationDto.password())
//                .telegramId(userCreationDto.telegramId())
//                .build();
//
//
//
//    }
//
//    @Test
//    void testCreateAdminAccount_UserDoesNotExist() {
//        // Arrange
//        when(userRepository.existsByEmail(anyString())).thenReturn(false); // Simulate user does not exist
//        when(userMapper.toUser(any(UserCreationDto.class))).thenReturn(appUser);
//        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
//        when(userRepository.save(any(AppUser.class))).thenReturn(appUser); // Mock the save method to return the appUser
//        doNothing().when(tokenService).sendValidationEmail(any(AppUser.class)); // Mock sending validation email
//        // Act
//        AppUser createdUser = userService.createAdminAccount(userCreationDto);
//
//        // Assert
//        assertNotNull(createdUser);
//        assertEquals("encodedPassword", createdUser.getPassword()); // Ensure password is encoded
//        assertEquals(Role.ADMIN, createdUser.getRole()); // Ensure role is set to ADMIN
//        assertEquals(EntityStatus.INACTIVE, createdUser.getStatus()); // Ensure status is set to ACTIVE
//
//        // Verify interactions with mocks
//        verify(userRepository).save(createdUser); // Ensure save method is called
//        verify(tokenService).sendValidationEmail(createdUser); // Ensure email validation is sent
//    }
//
//    @Test
//    void testCreateAdminAccount_UserAlreadyExists() {
//        // Arrange
//        when(userRepository.existsByEmail(anyString())).thenReturn(true); // Simulate user already exists
//
//        // Act & Assert
//        ConflictException exception = assertThrows(ConflictException.class, () -> {
//            userService.createAdminAccount(userCreationDto);
//        });
//        assertEquals("User already exists", exception.getMessage()); // Ensure the exception message is correct
//    }
//}
