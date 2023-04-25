package com.backend_spring.repository;

import com.backend_spring.entity.ImageProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageProductEntity, Integer> {

    int deleteAllByProductId(int id);
}
