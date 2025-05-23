package com.alabenhajsaad.api.business.partner.person;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Page<Person> findAll(Specification<Person> spec, Pageable pageable);
    Optional<Person> findByEmail(String email);
    @Query("SELECT p FROM person p JOIN p.phoneNumbers pn WHERE pn.number = :number")
    Optional<Person> findPersonByPhoneNumber(@Param("number") String number);

}
