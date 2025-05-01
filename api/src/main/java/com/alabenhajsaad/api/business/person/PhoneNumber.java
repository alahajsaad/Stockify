package com.alabenhajsaad.api.business.person;

import com.alabenhajsaad.api.business.person.person.Person;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "phone_number")
@Entity
@Builder
public class PhoneNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String number;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "person_id")
    private Person person;


}
