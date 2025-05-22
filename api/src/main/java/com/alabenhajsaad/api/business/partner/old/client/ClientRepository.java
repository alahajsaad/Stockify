package com.alabenhajsaad.api.business.partner.old.client;

//import com.alabenhajsaad.api.business.partner.old.person.PersonRepository;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//
//public interface ClientRepository extends PersonRepository<Client> {
//    @Query("SELECT c FROM Client c JOIN c.phoneNumbers p WHERE p.number LIKE :phoneNumber%")
//    Page<Client> findByPhoneNumbersStartingWith(@Param("phoneNumber") String phoneNumber, Pageable pageable);
//
//    @Query("SELECT c FROM Client c WHERE LOWER(c.firstName) LIKE LOWER(CONCAT('%', :name, '%'))")
//    Page<Client> searchByName(@Param("name") String name, Pageable pageable);
//
//    Page<Client> findAll(Specification<Client> spec, Pageable pageable);
//}
