package com.alabenhajsaad.api.business.partner.person;

import com.alabenhajsaad.api.business.partner.RoleType;
import com.alabenhajsaad.api.business.partner.organization.Organization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PersonService {
    Person createPerson(Person person);
    Person updatePerson(Person person);
    Person findById(Long id);
    Page<Person> getPersons(Pageable pageable , RoleType roleType , String keyword);
}
