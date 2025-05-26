package com.alabenhajsaad.api.core.user;

import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.core.user.dto.UserCreationDto;
import com.alabenhajsaad.api.core.user.dto.UserResponseDto;
import com.alabenhajsaad.api.core.user.dto.UserUpdateHigthLevelDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @PostMapping("/admin")
    public ResponseEntity<ApiResponse<UserResponseDto>> createAdminAccount(@RequestBody UserCreationDto dto) {
        return ResponseEntity.ok(ApiResponse.success(userService.createAdminAccount(dto),"Nouveau compte administrateur créé avec succès"));
    }

    @PostMapping("/employee/{id}")
    public ResponseEntity<ApiResponse<AppUser>> createEmployeeAccount(@RequestBody UserCreationDto dto, @PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(userService.createEmployeeAccount(dto,id),"Nouveau compte employé créé avec succès"));
    }

    @PutMapping("/employee")
    public ResponseEntity<ApiResponse<UserResponseDto>> updateUserLowLevel(@RequestBody UserCreationDto dto) {
        return ResponseEntity.ok(ApiResponse.success(userService.updateUserLowLevel(dto),"Votre compte est mis à jour avec succès"));
    }

    @PutMapping("/admin")
    // This method allows the company admin to update employee accounts without changing their passwords.
    public ResponseEntity<ApiResponse<UserResponseDto>> updateUserHighLevel(@RequestBody UserUpdateHigthLevelDto dto) {
        return ResponseEntity.ok(ApiResponse.success(userService.updateUserHighLevel(dto),"Le compte de votre employé est mis à jour avec succès"));
    }

    @GetMapping("/company/{id}")
    public  ResponseEntity<ApiResponse<List<UserResponseDto>>> getUsersByCompany(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(userService.getUsersByCompany(id),"Utilisateurs bien trouvés"));
    }



    @GetMapping()
    public ResponseEntity<ApiResponse<UserResponseDto>> getUserById(@RequestParam Integer id) {
        return ResponseEntity.ok(ApiResponse.success(userService.getUserDetailsById(id)));
    }
    @GetMapping("/email")
    public ResponseEntity<ApiResponse<UserResponseDto>> getUserByEmail(@RequestParam String email) {
        return ResponseEntity.ok(ApiResponse.success(userService.findUserByEmail(email)));
    }



}
