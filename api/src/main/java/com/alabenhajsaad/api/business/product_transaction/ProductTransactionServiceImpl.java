package com.alabenhajsaad.api.business.product_transaction;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ProductTransactionServiceImpl implements ProductTransactionService {

    private final ProductTransactionViewRepository repository;

    @Override
    public Page<ProductTransactionView> getTransactionsByProductId(
            Integer productId,
            String transactionType,
            String keyword,
            LocalDate startDate,
            LocalDate endDate,
            Integer counterpartId  ,
            Pageable pageable
    ) {
        Specification<ProductTransactionView> spec = ProductTransactionSpecification.filter(
                productId, transactionType, keyword, startDate, endDate , counterpartId
        );

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "transactionDate"));
        }

        return repository.findAll(spec, pageable);
    }

}

