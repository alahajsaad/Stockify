package com.alabenhajsaad.api.business.person.person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PersonRepository<T extends Person> extends JpaRepository<T, Long> {
    @Query("SELECT p FROM Person p JOIN p.phoneNumbers pn WHERE pn.number = :number")
    Optional<Person> findPersonByPhoneNumber(@Param("number") String number);
}
