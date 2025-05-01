package com.alabenhajsaad.api.business.person.supplier;

import com.alabenhajsaad.api.business.person.person.Person;
import com.alabenhajsaad.api.business.supplier_order.SupplierOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;


@Entity
public class Supplier extends Person {

    @OneToMany(mappedBy = "supplier" )
    @JsonIgnore
    private List<SupplierOrder> supplierOrderList ;
}
