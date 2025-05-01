package com.alabenhajsaad.api.business.person.person;

import com.alabenhajsaad.api.business.person.PhoneNumber;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true , fetch = FetchType.EAGER)
    private List<PhoneNumber> phoneNumbers ;
}
