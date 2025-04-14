package com.alabenhajsaad.api.core.user;

import com.alabenhajsaad.api.core.company.Company;

import com.alabenhajsaad.api.core.user_account_activation.Token;
import com.alabenhajsaad.api.core.enums.EntityStatus;
import com.alabenhajsaad.api.core.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class AppUser  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;
    private String lastName;
    private String email;
    @NotNull
    @Size(min = 8)
    private String password;
    private String telegramId;
    private String tenantId ;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private EntityStatus status;

    @OneToMany(mappedBy = "user")
    List<Token> tokens ;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @JsonProperty("companyId")
    public Integer getCompanyId() {
        return company != null ? company.getId() : null;
    }


    public String getUsername() {
        return email;
    }
    public String getFullName(){
        return firstName + " " + lastName;
    }
}
