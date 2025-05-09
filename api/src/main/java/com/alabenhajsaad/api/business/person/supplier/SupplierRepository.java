package com.alabenhajsaad.api.business.person.supplier;

import com.alabenhajsaad.api.business.person.person.PersonRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface SupplierRepository extends PersonRepository<Supplier> {
    @Query("SELECT s FROM Supplier s JOIN s.phoneNumbers p WHERE p.number LIKE :phoneNumber%")
    Page<Supplier> findByPhoneNumbersStartingWith(@Param("phoneNumber") String phoneNumber, Pageable pageable);

    @Query("SELECT s FROM Supplier s WHERE LOWER(s.firstName) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Supplier> searchByName(@Param("name") String name, Pageable pageable);


}
