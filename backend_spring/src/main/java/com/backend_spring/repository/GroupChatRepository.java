package com.backend_spring.repository;

import com.backend_spring.entity.GroupChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupChatRepository extends JpaRepository<GroupChatEntity, Integer> {
}
