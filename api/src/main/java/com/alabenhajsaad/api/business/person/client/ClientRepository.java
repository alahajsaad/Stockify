package com.alabenhajsaad.api.business.person.client;

import com.alabenhajsaad.api.business.person.person.PersonRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientRepository extends PersonRepository<Client> {
    @Query("SELECT c FROM Client c")
    @Override
    List<Client> findAll();
}
