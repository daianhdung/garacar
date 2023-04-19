package com.backend_spring.repository;

import com.backend_spring.entity.StatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<StatusEntity, Integer> {
}
