package com.alabenhajsaad.api.business.vat;

import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.core.exception.ConflictException;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VatServiceImpl implements VatService {
    private final VatRepository repository;
    private final ProductExternalService productExternalService;
    @Override
    public Vat addVat(Vat vat) {
        if (repository.existsByRate(vat.getRate())) {
            throw new ConflictException("Cette valeur de taxe existe déjà");
        }
        return repository.save(vat);
    }

    @Override
    public Vat updateVat(Vat vat) {
        Vat existing = repository.findById(vat.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Taxe introuvable avec l'ID : " + vat.getId()));

        existing.setRate(vat.getRate());
        existing.setDescription(vat.getDescription());

        return repository.save(existing);
    }

    @Override
    public Vat getVatById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Taxe introuvable avec l'ID : " + id));
    }

    @Override
    public List<Vat> getAllVats() {
        return repository.findAll();
    }

    @Override
    public void deleteVat(int id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Taxe introuvable avec l'ID : " + id);
        }

        if (productExternalService.existsByVatId(id)) {
            throw new IllegalStateException("Impossible de supprimer cette valeur de taxe car elle est liée à des produits.");
        }

        repository.deleteById(id);
    }

}
