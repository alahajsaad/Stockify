package com.alabenhajsaad.api.business.partner.partner;

import com.alabenhajsaad.api.business.partner.PartnerType;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PartnerServiceImpl implements PartnerService {
    private final PartnerRepository repository;

    @Override
    public Page<Partner> getPartners(Pageable pageable, String keyword, PartnerType type) {
       return repository.findPartners(type,keyword,pageable) ;
    }

    @Override
    public Partner getPartnerById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Partner with id " + id + " not found")
        );
    }


}
