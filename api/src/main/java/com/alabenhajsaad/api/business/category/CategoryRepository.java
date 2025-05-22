package com.alabenhajsaad.api.business.category;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;



public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsByName(String name);
    Page<Category> findAll(Specification<Category> spec, Pageable pageable);



}
