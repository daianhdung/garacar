package com.backend_spring.repository;

import com.backend_spring.entity.BookmarkProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<BookmarkProductEntity, Integer> {


}
