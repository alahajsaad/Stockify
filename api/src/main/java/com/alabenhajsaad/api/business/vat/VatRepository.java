package com.alabenhajsaad.api.business.vat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VatRepository extends JpaRepository<Vat, Integer> {
    boolean existsByRate(double rate);
}
