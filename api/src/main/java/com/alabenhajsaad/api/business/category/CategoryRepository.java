package com.alabenhajsaad.api.business.category;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsByName(String name);
    Page<Category> findByNameStartingWith(String name , Pageable pageable);


}
