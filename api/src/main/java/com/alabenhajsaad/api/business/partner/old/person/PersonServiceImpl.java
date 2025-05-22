package com.alabenhajsaad.api.business.partner.old.person;

import com.alabenhajsaad.api.business.partner.PhoneNumber;
import com.alabenhajsaad.api.core.exception.ConflictException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//@Service
//@RequiredArgsConstructor
//public class PersonServiceImpl<T extends Person> implements PersonService<T> {
//    private final PersonRepository<T> personRepository;
//
//    @Override
//    public T save(T person) {
//        validatePhoneNumbers(person, person.getId() != null);
//
//        if (person.getPhoneNumbers() != null) {
//            person.getPhoneNumbers().forEach(phoneNumber -> phoneNumber.setPerson(person));
//        }
//
//        return personRepository.save(person);
//    }
//
//    @Override
//    public T update(T person) {
//        validatePhoneNumbers(person, true);
//        if (person.getPhoneNumbers() != null) {
//            person.getPhoneNumbers().forEach(phoneNumber -> phoneNumber.setPerson(person));
//        }
//
//        return personRepository.save(person);
//    }
//
//
//
//    private void validatePhoneNumbers(Person person, boolean isUpdate) {
//        List<String> numberList = Optional.ofNullable(person.getPhoneNumbers())
//                .orElse(List.of())
//                .stream()
//                .map(PhoneNumber::getNumber)
//                .toList();
//
//        if (numberList.isEmpty()) {
//            return;
//        }
//
//        for (String number : numberList) {
//            Optional<Person> existingPerson = personRepository.findPersonByPhoneNumber(number);
//
//            if (existingPerson.isPresent()) {
//                if (!isUpdate || !existingPerson.get().getId().equals(person.getId())) {
//                    throw new ConflictException("A person already exists with phone number: " + number);
//                }
//            }
//        }
//    }
//}