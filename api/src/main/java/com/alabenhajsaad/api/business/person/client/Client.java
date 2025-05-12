package com.alabenhajsaad.api.business.person.client;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.person.person.Person;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Client extends Person {
    @OneToMany(mappedBy = "client" )
    @JsonIgnore
    private List<ClientOrder> clientOrderList ;
}
