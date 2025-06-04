package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.Address;
import com.alabenhajsaad.api.business.partner.PhoneNumber;
import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.business.partner.organization.Organization;
import com.alabenhajsaad.api.business.partner.person.Person;
import com.alabenhajsaad.api.business.utils.Auditable;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "entityType",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Organization.class, name = "ORGANIZATION"),
        @JsonSubTypes.Type(value = Person.class, name = "PERSON")
})
@Entity(name = "partner")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "entity_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Partner extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "partner_type")
    private PartnerType partnerType;

    @Column(name = "entity_type", insertable = false, updatable = false)
    private String entityType;

    @Column(unique = true)
    @Email(message = "Veuillez saisir une adresse e-mail valide.")
    private String email ;
    @OneToMany(mappedBy = "partner", cascade = CascadeType.ALL, orphanRemoval = true , fetch = FetchType.EAGER)
    private List<PhoneNumber> phoneNumbers ;

    @OneToMany(mappedBy = "partner", cascade = CascadeType.ALL, orphanRemoval = true , fetch = FetchType.EAGER)
    private List<Address> addresses ;

    public void addAddress(Address address) {
        if (address != null) {
            address.setPartner(this); // Set the back-reference
            if (addresses == null) {
                addresses = new ArrayList<>();
            }
            addresses.add(address);
        }
    }

    public void addPhoneNumber(PhoneNumber phoneNumber) {
        if (phoneNumber != null) {
            phoneNumber.setPartner(this); // Set the back-reference
            if (phoneNumbers == null) {
                phoneNumbers = new ArrayList<>();
            }
            phoneNumbers.add(phoneNumber);
        }
    }

}