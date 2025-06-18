package com.alabenhajsaad.api.business.product.dto;

public record ProductStatistics(
        Long total,
        Long inStockProducts,
        Long lowStockProducts,
        Long outOfStockProducts
) {
}
