package com.alabenhajsaad.api.business.category;

import com.alabenhajsaad.api.business.product.external.ProductExternalService;
import com.alabenhajsaad.api.core.exception.ConflictException;
import com.alabenhajsaad.api.core.exception.ResourceNotFoundException;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository repository;
    private final ProductExternalService productExternalService;
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
    public List<Category> getAllCategory() {
        return repository.findAll();
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
