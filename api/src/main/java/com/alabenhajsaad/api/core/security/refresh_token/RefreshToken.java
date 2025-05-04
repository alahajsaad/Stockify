package com.alabenhajsaad.api.core.security.refresh_token;

import com.alabenhajsaad.api.core.user.AppUser;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class RefreshToken {
    @Id
    @GeneratedValue
    private Integer id;
    private String token ;
    private Instant issuedAt;
    private Instant expiresAt;
    private boolean revoked;
    private String userAgent;
    private String ipAddress;

    @ManyToOne
    private AppUser user;

}

