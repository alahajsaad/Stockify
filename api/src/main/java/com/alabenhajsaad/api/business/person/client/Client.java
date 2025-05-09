package com.alabenhajsaad.api.business.person.client;

import com.alabenhajsaad.api.business.client_order.ClientOrder;
import com.alabenhajsaad.api.business.person.person.Person;
import com.alabenhajsaad.api.business.supplier_order.SupplierOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
public class Client extends Person {
    @OneToMany(mappedBy = "client" )
    @JsonIgnore
    private List<ClientOrder> clientOrderList ;
}
