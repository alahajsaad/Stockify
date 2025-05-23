package com.alabenhajsaad.api.business.partner.person;

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
@Entity(name = "person")
@DiscriminatorValue("PERSON")
public class Person extends Partner {
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    public String getFullName() {
        return this.getFirstName() + " " + this.getLastName();
    }

}

