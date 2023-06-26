package com.backend_spring.mapper;

import com.backend_spring.dto.GroupChatDTO;
import com.backend_spring.dto.MessageDTO;
import com.backend_spring.entity.GroupChatEntity;
import com.backend_spring.entity.MessageEntity;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {

    public MessageEntity toMessageEntity(MessageDTO messageDTO){
        MessageEntity messageEntity = new MessageEntity();
        messageEntity.setSenderName(messageDTO.getSenderName());
        messageEntity.setReceiverName(messageDTO.getReceiverName());
        messageEntity.setMessage(messageDTO.getMessage());

        return messageEntity;
    }

    public MessageDTO toMessageDTO(MessageEntity messageEntity){
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setSenderName(messageEntity.getSenderName());
        messageDTO.setReceiverName(messageEntity.getReceiverName());
        messageDTO.setMessage(messageEntity.getMessage());
//        messageDTO.setRecentlyTime(messageEntity.getCreatAt().);

        return messageDTO;
    }
}
