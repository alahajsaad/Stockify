package com.alabenhajsaad.api.business.person.client;


import java.util.List;

public interface ClientService {
    Client save(Client client);
    List<Client> findAll();
}
