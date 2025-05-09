package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.client_order_line.ClientOrderLineRepository;
import com.alabenhajsaad.api.business.product.dto.ProductTransactionDTO;
import com.alabenhajsaad.api.business.supplier_order_line.SupplierOrderLineRepository;
import com.alabenhajsaad.api.core.exception.ConflictException;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repository;
    private final ClientOrderLineRepository clientOrderLineRepository;
    private final SupplierOrderLineRepository supplierOrderLineRepository;

    @Override
    public List<Product> addMultipleProducts(List<Product> products) {

        // Mesurer l'utilisation de la mémoire avant
        Runtime runtime = Runtime.getRuntime();
        long memoryBefore = runtime.freeMemory();
        // Démarrer le suivi du temps
        StopWatch stopWatch = new StopWatch();
        stopWatch.start("addMultipleProducts");
        // Step 1: Gather all the references and designations that are already in the database
        List<String> references = products.stream()
                .map(Product::getReference)
                .toList();
        List<String> designations = products.stream()
                .map(Product::getDesignation)
                .toList();

        // Step 2: Check which products are already present in the database
        List<Product> existingProducts = repository.findByReferenceInOrDesignationIn(references, designations);

        // Step 3: Filter out the products that already exist
        List<Product> newProducts = products.stream()
                .filter(product -> existingProducts.stream()
                        .noneMatch(existing -> existing.getReference().equals(product.getReference()) || existing.getDesignation().equals(product.getDesignation())))
                .toList();



        // Step 4: Save only new products
        List<Product> savedProducts = repository.saveAll(newProducts);

        // Mesurer l'utilisation de la mémoire après
        long memoryAfter = runtime.freeMemory();

        stopWatch.stop();

        System.out.println("Temps d'exécution pour l'ajout des produits: " + stopWatch.getTotalTimeMillis() + " ms");
        System.out.println("Mémoire utilisée: " + (memoryBefore - memoryAfter) / 1024 + " KB");

        return savedProducts;
    }


    @Override
    public Product addProduct(Product product) {
        if(repository.existsByReferenceOrDesignation(product.getReference(),product.getDesignation())){
            throw new ConflictException("Ce produit existe déjà");
        }
        product.setStockStatus(StockStatus.OUT_OF_STOCK);
        return repository.save(product);
    }



    @Override
    public Page<Product> getFiltredProducts(StockStatus status,String keyword ,Pageable pageable) {
        Specification<Product> specification = Specification
                .where(ProductSpecification.hasNameOrReferenceOrCategoryLike(keyword))
                .and(ProductSpecification.hasStockStatus(status)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return repository.findAll(specification, pageable);
    }

    @Override
    public Product getProductById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable"));
    }

    @Override
    public Product updateProduct(Product product) {
        if(!repository.existsById(product.getId())){
            throw new ResourceNotFoundException("Produit introuvable");
        }
        return repository.save(product);

    }

    @Override
    public Page<ProductTransactionDTO> getAllProductTransactions(Integer productId, Pageable pageable) {
        // 1. Fetch all transactions (consider optimizing with limits if dataset is large)
        List<ProductTransactionDTO> sales = clientOrderLineRepository.findSalesTransactionsByProductId(productId);
        List<ProductTransactionDTO> purchases = supplierOrderLineRepository.findPurchaseTransactionsByProductId(productId);

        // 2. Combine and sort
        List<ProductTransactionDTO> combined = new ArrayList<>();
        combined.addAll(sales);
        combined.addAll(purchases);
        combined.sort(Comparator.comparing(ProductTransactionDTO::getTransactionDate).reversed());

        // 3. Manual pagination
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), combined.size());
        List<ProductTransactionDTO> paged = combined.subList(start, end);

        return new PageImpl<>(paged, pageable, combined.size());
    }


}
