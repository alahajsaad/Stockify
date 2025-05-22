package com.alabenhajsaad.api.business.partner.person;

import com.alabenhajsaad.api.business.partner.RoleType;
import com.alabenhajsaad.api.business.partner.organization.Organization;
import com.alabenhajsaad.api.core.exception.ConflictException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService{

    private final PersonRepository personRepository;


    @Override
    public Person createPerson(Person person) {
        // Vérifier l'unicité du numéro d'enregistrement
        if (personRepository.findByEmail(person.getEmail()).isPresent()) {
            throw new ConflictException("Organization with registration number " +
                    person.getEmail() + " already exists");
        }
        handlePersonRelations(person);

        return personRepository.save(person);
    }

    @Override
    @Transactional
    public Person updatePerson(Person updatedPerson) {
        Person existing = personRepository.findById(updatedPerson.getId())
                .orElseThrow(() -> new EntityNotFoundException("Organization not found"));

        // Merge scalar fields (only if not null or changed)
        if (updatedPerson.getFirstName() != null &&
                !updatedPerson.getFirstName().equals(existing.getFirstName())) {
            existing.setFirstName(updatedPerson.getFirstName());
        }

        if (updatedPerson.getLastName() != null &&
                !updatedPerson.getLastName().equals(existing.getLastName())) {
            existing.setLastName(updatedPerson.getLastName());
        }


        if (updatedPerson.getRoleType() != null &&
                !updatedPerson.getRoleType().equals(existing.getRoleType())) {
            existing.setRoleType(updatedPerson.getRoleType());
        }

        // Email (optional)
        if (updatedPerson.getEmail() != null &&
                !updatedPerson.getEmail().equals(existing.getEmail())) {
            existing.setEmail(updatedPerson.getEmail());
        }

        // Replace addresses
        if (updatedPerson.getAddresses() != null) {
            existing.getAddresses().clear();
            updatedPerson.getAddresses().forEach(addr -> {
                addr.setPartner(existing); // Set FK back-reference
                existing.getAddresses().add(addr);
            });
        }

        // Replace phone numbers
        if (updatedPerson.getPhoneNumbers() != null) {
            existing.getPhoneNumbers().clear();
            updatedPerson.getPhoneNumbers().forEach(phone -> {
                phone.setPartner(existing); // Set FK back-reference
                existing.getPhoneNumbers().add(phone);
            });
        }

        return personRepository.save(existing); // No insert, just update
    }

    @Override
    public Person findById(Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Person not found"));
    }

    @Override
    public Page<Person> getPersons(Pageable pageable, RoleType roleType, String keyword) {
        Specification<Person> specification = Specification
                .where(PersonSpecification.hasKeyword(keyword))
                .and(PersonSpecification.hasRoleType(roleType)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return personRepository.findAll(specification, pageable);
    }


    private void handlePersonRelations(Person person) {
        if (person.getAddresses() != null) {
            person.getAddresses().forEach(address -> address.setPartner(person));
        }
        if (person.getPhoneNumbers() != null) {
            person.getPhoneNumbers().forEach(phone -> phone.setPartner(person));
        }
    }
}

