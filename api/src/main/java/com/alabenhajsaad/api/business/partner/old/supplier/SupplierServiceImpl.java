package com.alabenhajsaad.api.business.partner.old.supplier;

import com.alabenhajsaad.api.business.partner.old.person.PersonService;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
//@RequiredArgsConstructor
//public class SupplierServiceImpl implements SupplierService {
//    private final SupplierRepository repository;
//    private final PersonService<Supplier> personService;
//
//    @Override
//    public Supplier save(Supplier supplier) {
//        return personService.save(supplier);
//    }
//
//    @Override
//    public Supplier update(Supplier supplier) {
//        return personService.update(supplier);
//    }
//
//    @Override
//    public Supplier findById(Long id) {
//        return repository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("fournisseur ne pas trouvee"));
//    }
//
//    @Override
//    public Page<Supplier> findAll(Pageable pageable) {
//        return repository.findAll(pageable);
//    }
//
//
//    @Override
//    public List<Supplier> searchByPhoneNumberOrName(String keyword) {
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
//        private boolean isPhoneNumber(String field) {
//        return field.matches("\\d+") ;
//    }
//
//
//
//
//}
