package com.alabenhajsaad.api.business.person.person;

import java.util.List;

public interface PersonService<T extends Person> {
    T save(T person) ;
    T update(T person) ;
}
