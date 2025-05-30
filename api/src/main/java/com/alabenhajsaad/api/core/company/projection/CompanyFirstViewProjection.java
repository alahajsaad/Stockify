package com.alabenhajsaad.api.core.company.projection;


import java.time.LocalDate;

public interface CompanyFirstViewProjection {
    Integer getId();
    String getName();
    String getEmail();
    String getPhone();
    LocalDate getCreatedAt();
    Integer getNumberOfUser();
}
