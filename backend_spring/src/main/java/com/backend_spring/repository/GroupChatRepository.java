package com.backend_spring.repository;

import com.backend_spring.entity.GroupChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupChatRepository extends JpaRepository<GroupChatEntity, Integer> {

    GroupChatEntity findBySenderName(String senderName);

    List<GroupChatEntity> findAllByReceiverName(String receiverName);

}
