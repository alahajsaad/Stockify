package com.alabenhajsaad.api.business.partner.person;

import com.alabenhajsaad.api.business.partner.PartnerType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PersonService {
    Person createPerson(Person person);
    Person updatePerson(Person person);
    Person findById(Long id);
    Page<Person> getPersons(Pageable pageable , PartnerType roleType , String keyword);
}
