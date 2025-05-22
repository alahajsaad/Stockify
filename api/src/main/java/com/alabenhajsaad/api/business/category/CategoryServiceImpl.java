package com.alabenhajsaad.api.business.category;

import com.alabenhajsaad.api.business.product.Product;
import com.alabenhajsaad.api.business.product.ProductSpecification;
import com.alabenhajsaad.api.business.product.StockStatus;
import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.core.exception.ConflictException;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository repository;
    private final ProductExternalService productExternalService;
    @Override
    public List<Category> addMultipleCategories(List<Category> categories) {
        for (Category category : categories) {
            if (repository.existsByName(category.getName())) {
                throw new ConflictException("La valeur de taxe " + category.getName() + " existe déjà");
            }
        }
        return repository.saveAll(categories);
    }

    @Override
    public Category addCategory(Category category) {
        if(repository.existsByName(category.getName())){
            throw new ConflictException("Une catégorie portant le nom '" + category.getName() + "' existe déjà.");
        }
        return repository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return repository.save(category);
    }

    @Override
    public Page<Category> getCategories(Pageable pageable, String keyword) {
        return repository.findAll(CategorieSpecification.hasKeyword(keyword), pageable);
    }


    @Override
    public Category getCategoryById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie avec l'ID " + id + " introuvable"));
    }


    @Override
    public void deleteCategoryById(int id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Catégorie avec l'ID " + id + " introuvable");
        }

        if (productExternalService.existsByCategoryId(id)) {
            throw new IllegalStateException("Impossible de supprimer cette catégorie car elle est liée à des produits.");
        }

        repository.deleteById(id);
    }





}
