package com.alabenhajsaad.api.company.projection;


import com.alabenhajsaad.api.enums.Subscription;

import java.time.LocalDate;

public interface CompanyFirstViewProjection {
    Integer getId();
    String getName();
    String getEmail();
    String getPhone();
    Subscription getSubscription();
    LocalDate getCreatedAt();
    Integer getNumberOfUser();
}
