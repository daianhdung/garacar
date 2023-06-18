package com.backend_spring.repository;

import com.backend_spring.entity.VisitorEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends JpaRepository<VisitorEntity, Integer> {

    Page<VisitorEntity> findByIpAddressOrderByStartTimeDesc(String ipAddress, Pageable pageable);
}
