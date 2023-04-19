package com.backend_spring.repository;

import com.backend_spring.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {


    @Query(value = "SELECT MAX(price) from product GROUP BY brand_id", nativeQuery = true)
    List<Integer> findMaxPricePerBrand();

    List<ProductEntity> findAllByPriceIsIn(List<Integer> listPrice);

    @Query(value = "SELECT * from product ORDER BY amount_of_sold DESC LIMIT 10", nativeQuery = true)
    List<ProductEntity> findByTop10Product();

    ProductEntity findById(int id);

    @Query(value = "SELECT * FROM product WHERE name LIKE ?1 LIMIT 5", nativeQuery = true)
    List<ProductEntity> findByKeyword(String name);

    List<ProductEntity> findAllByBrandId(int brandId);
    List<ProductEntity> findAllByCategoryId(int categoryId);

}
