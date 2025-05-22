package com.alabenhajsaad.api.business.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    List<Category> addMultipleCategories(List<Category> categories);
    Category addCategory(Category category);
    Category updateCategory(Category category);
    Page<Category> getCategories(Pageable pageable , String keyword);
    Category getCategoryById(int id);
    void deleteCategoryById(int id);
}
