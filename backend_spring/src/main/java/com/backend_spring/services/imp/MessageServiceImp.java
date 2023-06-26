package com.backend_spring.services.imp;

import com.backend_spring.dto.MessageDTO;
import com.backend_spring.entity.GroupChatEntity;
import com.backend_spring.entity.MessageEntity;
import com.backend_spring.mapper.MessageMapper;
import com.backend_spring.repository.GroupChatRepository;
import com.backend_spring.repository.MessageRepository;
import com.backend_spring.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageServiceImp implements MessageService {
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    GroupChatRepository groupChatRepository;

    @Autowired
    MessageMapper messageMapper;

    @Override
    public boolean saveMessageByGroupId(int groupId, MessageDTO messageDTO) {
        try {
            MessageEntity messageEntity = new MessageEntity();
            Optional<GroupChatEntity> groupChatEntity = groupChatRepository.findById(groupId);


            messageEntity.setGroup(groupChatEntity.get());
            messageEntity.setSenderName(messageDTO.getSenderName());
            messageEntity.setReceiverName(messageDTO.getReceiverName());
            messageEntity.setMessage(messageDTO.getMessage());
            messageRepository.save(messageEntity);
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<MessageDTO> getGroupChatAndMessageRecently(MessageDTO messageDTO) {
        List<MessageDTO> messageDTOList = new ArrayList<>();
        GroupChatEntity groupChatEntity = groupChatRepository.findBySenderName(messageDTO.getSenderName());
        LocalDateTime localDateTime = LocalDateTime.of(messageDTO.getRecentlyTime().getYear(),
                messageDTO.getRecentlyTime().getMonth(),
                messageDTO.getRecentlyTime().getDay(),
                messageDTO.getRecentlyTime().getHour(),
                messageDTO.getRecentlyTime().getMinute(),
                messageDTO.getRecentlyTime().getSecond());
        messageRepository.findByGroupAndCreatAtIsAfter(groupChatEntity, localDateTime)
                .forEach(item -> {
                    messageDTOList.add(messageMapper.toMessageDTO(item));
                });
        return messageDTOList;
    }

    @Override
    public List<MessageDTO> getHistoryChatAfterSendMessage(MessageDTO messageDTO) {
        Optional<GroupChatEntity> groupChatEntity = groupChatRepository.findById(messageDTO.getGroupId());
        int limit = 15;
        Pageable pageable = PageRequest.of(0, limit, Sort.by("creatAt").descending());
        try{
            List<MessageEntity> messageEntityList = messageRepository.findByGroup(groupChatEntity.get(), pageable).getContent();
            List<MessageDTO> messageDTOList = new ArrayList<>(messageEntityList.size());

            ListIterator<MessageEntity> iterator = messageEntityList.listIterator(messageEntityList.size());
            while (iterator.hasPrevious()) {
                MessageEntity messageEntity = iterator.previous();
                messageDTOList.add(messageMapper.toMessageDTO(messageEntity));
            }
            return messageDTOList;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }


}
