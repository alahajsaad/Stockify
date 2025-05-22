package com.alabenhajsaad.api.business.partner.old.client;

import com.alabenhajsaad.api.business.partner.old.person.PersonService;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
//@RequiredArgsConstructor
//public class ClientServiceImpl implements ClientService {
//    private final PersonService<Client> personService;
//    private final ClientRepository repository;
//    @Override
//    public Client save(Client client) {
//        return personService.save(client);
//    }
//
//    @Override
//    public Client update(Client client) {
//        return personService.save(client);
//    }
//
//    @Override
//    public Client findById(Long id) {
//        return repository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("client ne pas trouvee"));
//    }
//
//
//    @Override
//    public Page<Client> findAll(Pageable pageable , String keyWord) {
//        Specification<Client> specification = Specification
//                .where(ClientSpecification.hasNameOrPhoneNumberLike(keyWord));
//
//        if (pageable.getSort().isUnsorted()) {
//            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
//        }
//        return repository.findAll(specification , pageable);
//    }
//
//    @Override
//    public List<Client> searchByPhoneNumberOrName(String keyword) {
//        if (keyword == null || keyword.trim().isEmpty()) {
//            return List.of();
//        }
//
//        String trimmedKeyword = keyword.trim();
//        String digitsOnly = trimmedKeyword.replaceAll("[^\\d]", "");
//        Pageable pageable = PageRequest.of(0, 5);
//
//        if (isPhoneNumber(digitsOnly)) {
//            return repository.findByPhoneNumbersStartingWith(digitsOnly, pageable).getContent();
//        } else {
//            return repository.searchByName(trimmedKeyword, pageable).getContent();
//        }
//    }
//
//    private boolean isPhoneNumber(String field) {
//        return field.matches("\\d+") ;
//    }
//
//
//}
