package com.alabenhajsaad.api.business.partner.organization;

import com.alabenhajsaad.api.business.partner.partner.Partner;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "organization")
@DiscriminatorValue("ORGANIZATION")
public class Organization extends Partner {
    @Column(name = "company_name")
    private String companyName;

    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "tax_number")
    private String taxNumber;



}