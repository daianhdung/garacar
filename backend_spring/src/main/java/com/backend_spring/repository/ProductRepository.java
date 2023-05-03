package com.backend_spring.repository;

import com.backend_spring.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {


    List<ProductEntity> findAllByPriceIsIn(List<Integer> listPrice);

    List<ProductEntity> findAllByBrandId(int brandId);

    List<ProductEntity> findAllByCategoryId(int categoryId);

    Page<ProductEntity> findByNameContainingAndCategoryIdInOrBrandIdIn(String keyword
            , List<Integer> categoryIds , List<Integer> brandIds, Pageable pageable);

    Page<ProductEntity> findByNameContaining(String keyword, Pageable pageable);

}
