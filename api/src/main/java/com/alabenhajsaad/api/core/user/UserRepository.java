package com.alabenhajsaad.api.core.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Integer> {
    Boolean existsByTelegramId(String telegramId);
    Boolean existsByEmail(String email);
    List<AppUser> findUsersByCompany_Id(Integer companyId);
    Optional<AppUser> findByEmail(String username);
}
