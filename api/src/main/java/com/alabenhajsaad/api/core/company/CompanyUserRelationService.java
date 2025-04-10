package com.alabenhajsaad.api.core.company;


import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.UserRepository;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyUserRelationService {

    private final UserRepository userRepository;


    public AppUser getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }
    public void updateUser(AppUser user) {
        userRepository.save(user);
    }

}
