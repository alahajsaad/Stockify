package com.alabenhajsaad.api.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + username + " does not exist"));



        return User
                .withUsername(appUser.getUsername())
                .password(appUser.getPassword())
                .roles(appUser.getRole().toString())
                .build() ;
    }
}

