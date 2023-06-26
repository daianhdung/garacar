package com.backend_spring.services;

import com.backend_spring.dto.GroupChatDTO;
import com.backend_spring.dto.MessageDTO;
import com.backend_spring.entity.MessageEntity;

import java.util.List;

public interface MessageService {

    boolean saveMessageByGroupId(int groupId, MessageDTO messageDTO);

    List<MessageDTO> getGroupChatAndMessageRecently(MessageDTO messageDTO);

    List<MessageDTO> getHistoryChatAfterSendMessage(MessageDTO messageDTO);
}
