package com.alabenhajsaad.api.business.person.client;

import com.alabenhajsaad.api.business.person.person.PersonService;
import com.alabenhajsaad.api.business.person.supplier.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final PersonService<Client> personService;
    private final ClientRepository clientRepository;
    @Override
    public Client save(Client client) {
        return personService.save(client);
    }

    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }
}
