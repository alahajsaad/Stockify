package com.alabenhajsaad.api.business.category;

import java.util.List;

public interface CategoryService {
    List<Category> addMultipleCategories(List<Category> categories);
    Category addCategory(Category category);
    Category updateCategory(Category category);
    List<Category> getAllCategory();
    Category getCategoryById(int id);
    void deleteCategoryById(int id);
    List<Category> searchCategory(String searchKey) ;
}
