package com.backend_spring.repository;

import com.backend_spring.entity.GroupChatEntity;
import com.backend_spring.entity.MessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {

    List<MessageEntity> findByGroupAndCreatAtIsAfter(GroupChatEntity groupChatEntity, LocalDateTime localDateTime);

    Page<MessageEntity> findByGroupOrderByCreatAtDesc(GroupChatEntity groupChatEntity, Pageable pageable);

    Page<MessageEntity> findByGroup(GroupChatEntity groupChatEntity, Pageable pageable);
}
