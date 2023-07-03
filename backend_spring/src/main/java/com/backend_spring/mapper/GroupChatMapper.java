package com.backend_spring.mapper;

import com.backend_spring.dto.GroupChatDTO;
import com.backend_spring.entity.GroupChatEntity;
import org.springframework.stereotype.Component;

@Component
public class GroupChatMapper {

    public GroupChatEntity toGroupChatEntity(GroupChatDTO groupChatDTO){
        GroupChatEntity groupChatEntity = new GroupChatEntity();
        groupChatEntity.setSeen(groupChatDTO.isSeen());
        groupChatEntity.setSenderName(groupChatDTO.getSenderName());
        groupChatEntity.setReceiverName(groupChatDTO.getReceiverName());

        return groupChatEntity;
    }

    public GroupChatDTO toGroupChatDTO(GroupChatEntity groupChatEntity){
        GroupChatDTO groupChatDTO = new GroupChatDTO();
        groupChatDTO.setId(groupChatEntity.getId());
        groupChatDTO.setSeen(groupChatEntity.isSeen());
        groupChatDTO.setSenderName(groupChatEntity.getSenderName());
        groupChatDTO.setReceiverName(groupChatEntity.getReceiverName());
        return groupChatDTO;
    }
}
