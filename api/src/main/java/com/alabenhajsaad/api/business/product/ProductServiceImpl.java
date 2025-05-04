package com.alabenhajsaad.api.business.product;

import com.alabenhajsaad.api.business.product.dto.ProductFilter;
import com.alabenhajsaad.api.core.exception.ConflictException;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repository;

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
    public Page<Product> getFiltredProducts(ProductFilter productFilter ,Pageable pageable) {
        Specification<Product> specification = Specification
                .where(ProductSpecification.hasCategory(productFilter.categoryId()))
                .and(ProductSpecification.hasStockStatus(productFilter.status()))
                .and(ProductSpecification.hasNameOrReferenceLike(productFilter.keyword()));

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


}
