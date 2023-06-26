package com.backend_spring.services;

import com.backend_spring.dto.GroupChatDTO;
import com.backend_spring.dto.MessageDTO;
import com.backend_spring.entity.GroupChatEntity;

import java.util.List;

public interface GroupChatService {

    boolean createNewGroupChat(MessageDTO messageDTO);

    List<GroupChatDTO> fetchAllGroupChatByReceiverName(String receiverName);

    GroupChatDTO fetchGroupWithAllMessage(int groupId);

    GroupChatEntity saveMessageWithGroup(MessageDTO messageDTO);
}
