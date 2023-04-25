package com.backend_spring.repository;

import com.backend_spring.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Integer> {

    Optional<BrandEntity> findById(int id);

    List<BrandEntity> findByIdIsIn(List<Integer> integerList);


}
