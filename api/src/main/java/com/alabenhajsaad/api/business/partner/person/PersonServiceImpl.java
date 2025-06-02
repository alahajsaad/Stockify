package com.alabenhajsaad.api.business.partner.person;

import com.alabenhajsaad.api.business.partner.PhoneNumber;
import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.business.utils.ErrorMessages;
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
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService{

    private final PersonRepository personRepository;


    @Override
    public Person createPerson(Person person) {
        if (personRepository.findByEmail(person.getEmail()).isPresent()) {
            throw new ConflictException("Une personne avec l'adresse e-mail '" + person.getEmail() + "' existe déjà.");
        }
        validatePhoneNumbers(person, false);
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


        if (updatedPerson.getPartnerType() != null &&
                !updatedPerson.getPartnerType().equals(existing.getPartnerType())) {
            existing.setPartnerType(updatedPerson.getPartnerType());
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
    public Page<Person> getPersons(Pageable pageable, PartnerType roleType, String keyword) {
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

    private void validatePhoneNumbers(Person person, boolean isUpdate) {
        List<PhoneNumber> numberList = person.getPhoneNumbers();
        if (numberList == null || numberList.isEmpty()) {
            throw new EntityNotFoundException(ErrorMessages.NO_PHONE_NUMBER);
        }

        numberList.forEach(phone -> {
            Optional<Person> existingPerson = personRepository.findPersonByPhoneNumber(phone.getNumber());
            if (existingPerson.isPresent()) {
                boolean samePerson = existingPerson.get().getId().equals(person.getId());
                if (!isUpdate || !samePerson) {
                    throw new ConflictException("Le numéro de téléphone '" + phone.getNumber() +
                            "' est déjà utilisé par " + existingPerson.get().getFullName());

                }
            }
        });
    }


}

