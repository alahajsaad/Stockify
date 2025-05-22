package com.alabenhajsaad.api.business.partner.person;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Page<Person> findAll(Specification<Person> spec, Pageable pageable);
    Optional<Person> findByEmail(String email);

}
