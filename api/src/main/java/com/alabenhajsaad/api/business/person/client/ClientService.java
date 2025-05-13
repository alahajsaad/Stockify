package com.alabenhajsaad.api.business.person.client;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ClientService {
    Client save(Client client);
    Client update(Client client) ;
    Client findById(Long id);
    Page<Client> findAll(Pageable pageable , String keyWord);
    List<Client> searchByPhoneNumberOrName(String keyword) ;
}
