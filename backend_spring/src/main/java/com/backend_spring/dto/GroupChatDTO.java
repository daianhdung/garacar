package com.backend_spring.dto;

import com.backend_spring.entity.MessageEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class GroupChatDTO {

    private int id;
    private String senderName;
    private String receiverName;
    private LocalDateTime createdDate;
    private String lastMessage;
    private LocalDateTime timeLastMessage;
    private String customerName;
    private boolean isSeen;

//    private List<MessageEntity> messageEntityList;
    private List<MessageDTO> messageDTOList;
}
