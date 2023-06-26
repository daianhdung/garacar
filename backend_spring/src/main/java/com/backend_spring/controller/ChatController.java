package com.backend_spring.controller;

import com.backend_spring.dto.MessageDTO;
import com.backend_spring.model.LocalDateTimeModel;
import com.backend_spring.payload.response.ChatSocketResponse;
import com.backend_spring.services.GroupChatService;
import com.backend_spring.services.MessageService;
import com.backend_spring.utils.enumpackage.StatusMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    GroupChatService groupChatService;
    @Autowired
    MessageService messageService;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageDTO sendMessage(@Payload MessageDTO messageDTO) {
        System.out.println(1111);
        return messageDTO;
    }

    @MessageMapping("/private-message")
    public MessageDTO receivePrivateMessage(@Payload MessageDTO messageDTO) {
        simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverName(), "private", messageDTO);
        return messageDTO;
    }

    @MessageMapping("/private-message-create")
    public void createGroupChatAndSendFirstMessage(@Payload MessageDTO messageDTO) {
        StatusMessage message = messageDTO.getStatus();
        ChatSocketResponse chatSocketResponse = new ChatSocketResponse();
        chatSocketResponse.setAction(messageDTO.getStatus());
        switch (message) {
            case SEND_MESSAGE:
                saveAndSendNotification(messageDTO);
                break;
            case RECENTLY_CONNECTION:
                chatSocketResponse.setObject(messageService.getGroupChatAndMessageRecently(messageDTO));
                simpMessagingTemplate.convertAndSendToUser(messageDTO.getSenderName()
                        , "private"
                        , chatSocketResponse);
                break;
            case JOIN:
                boolean isSuccess = groupChatService.createNewGroupChat(messageDTO);
                if (isSuccess) {
                    messageDTO.setRecentlyTime(new LocalDateTimeModel());
                    messageDTO.setStatus(StatusMessage.NOTIFICATION_MESSAGE);
                    simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverName(), "private", messageDTO);
                }
                break;
            case FETCH_ALL_GROUP_CHAT_ADMIN:
                chatSocketResponse.setObject(groupChatService.fetchAllGroupChatByReceiverName(messageDTO.getReceiverName()));
                simpMessagingTemplate.convertAndSendToUser(messageDTO.getSenderName(), "private", chatSocketResponse);
                break;
            case FETCH_ALL_MESSAGE_IN_GROUP:
                chatSocketResponse.setObject(groupChatService.fetchGroupWithAllMessage(messageDTO.getGroupId()));
                simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverName(), "private", chatSocketResponse);
                break;
        }
    }

    public void saveAndSendNotification(MessageDTO messageDTO){
        ChatSocketResponse chatSocketResponse = new ChatSocketResponse();
        chatSocketResponse.setAction(messageDTO.getStatus());
        if(messageDTO.getGroupId() == 0){
            var group = groupChatService.saveMessageWithGroup(messageDTO);
            chatSocketResponse.setGroupId(group.getId());
            messageDTO.setGroupId(group.getId());
            chatSocketResponse.setCustomerName(group.getSenderName());
        }else{
            chatSocketResponse.setGroupId(messageDTO.getGroupId());
            groupChatService.saveMessageWithGroup(messageDTO);
        }
        chatSocketResponse.setObject(messageDTO);
        simpMessagingTemplate.convertAndSendToUser(messageDTO.getSenderName()
                , "private", chatSocketResponse);
        chatSocketResponse.setObject(messageService.getHistoryChatAfterSendMessage(messageDTO));
        chatSocketResponse.setAction(StatusMessage.NOTIFICATION_MESSAGE);

        simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverName()
                , "private", chatSocketResponse);
    }
}
