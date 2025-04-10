package com.alabenhajsaad.api.core.company.projection;


import com.alabenhajsaad.api.core.enums.Subscription;

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
