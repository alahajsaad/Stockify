package com.alabenhajsaad.api.business.partner.old.person;

import com.alabenhajsaad.api.business.partner.PhoneNumber;
import com.alabenhajsaad.api.business.utils.Auditable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Inheritance(strategy = InheritanceType.JOINED)
//@DiscriminatorColumn(name = "entity_type")
//public class Person extends Auditable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//
//    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true , fetch = FetchType.EAGER)
//    private List<PhoneNumber> phoneNumbers ;
//}
