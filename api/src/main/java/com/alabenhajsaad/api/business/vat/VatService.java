package com.alabenhajsaad.api.business.vat;

import java.util.List;

public interface VatService {
    Vat addVat(Vat vat);
    Vat updateVat(Vat vat);
    Vat getVatById(int id);
    List<Vat> getAllVats();
    void deleteVat(int id);
}
