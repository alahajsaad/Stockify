package com.alabenhajsaad.api.business.product_transaction;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class ProductTransactionController {

    private final ProductTransactionService transactionService;

    @GetMapping("/product/{productId}")
    public Page<ProductTransactionView> getProductTransactions(
            @PathVariable Integer productId,
            @RequestParam(required = false) String transactionType,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Integer counterpartId,  // New param
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        return transactionService.getTransactionsByProductId(
                productId, transactionType, keyword, startDate, endDate, counterpartId, PageRequest.of(page, size));
    }

}
