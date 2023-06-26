package com.backend_spring.services.imp;

import com.backend_spring.dto.GroupChatDTO;
import com.backend_spring.dto.MessageDTO;
import com.backend_spring.entity.GroupChatEntity;
import com.backend_spring.entity.MessageEntity;
import com.backend_spring.entity.VisitorEntity;
import com.backend_spring.mapper.GroupChatMapper;
import com.backend_spring.mapper.MessageMapper;
import com.backend_spring.repository.GroupChatRepository;
import com.backend_spring.repository.MessageRepository;
import com.backend_spring.services.GroupChatService;
import com.backend_spring.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GroupChatServiceImp implements GroupChatService {

    @Autowired
    GroupChatMapper groupChatMapper;
    @Autowired
    GroupChatRepository groupChatRepository;
    @Autowired
    MessageService messageService;
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    MessageMapper messageMapper;

    @Override
    public boolean createNewGroupChat(MessageDTO messageDTO) {
        try {
            GroupChatEntity groupChatFinder = groupChatRepository.findBySenderName(messageDTO.getSenderName());
            if (groupChatFinder!= null) {
                messageService.saveMessageByGroupId(groupChatFinder.getId(), messageDTO);
            }else{
                GroupChatEntity groupChatEntity = new GroupChatEntity();
                groupChatEntity.setSenderName(messageDTO.getSenderName());
                groupChatEntity.setReceiverName(messageDTO.getReceiverName());
                var groupChatSaved = groupChatRepository.save(groupChatEntity);
                messageService.saveMessageByGroupId(groupChatSaved.getId(), messageDTO);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<GroupChatDTO> fetchAllGroupChatByReceiverName(String receiverName) {
        var listGroupChat = groupChatRepository.findAllByReceiverName(receiverName)
                .stream()
                .map(item ->
                        {
                            int limit = 1;
                            Pageable page = PageRequest.of(0, limit);
                            Page< MessageEntity > messageEntityPage = messageRepository.findByGroupOrderByCreatAtDesc(
                                    item, page);
                            var groupDTO = groupChatMapper.toGroupChatDTO(item);
                            var lastMessage = messageEntityPage.getContent().get(0);
                            groupDTO.setLastMessage(lastMessage.getMessage());
                            groupDTO.setCustomerName(item.getSenderName());
                            groupDTO.setSenderName(lastMessage.getSenderName());
                            groupDTO.setCreatedDate(lastMessage.getCreatAt());
                            return groupDTO;
                        }
                ).collect(Collectors.toList());
        return listGroupChat.stream().sorted(Comparator.comparing(GroupChatDTO::getCreatedDate, Comparator.reverseOrder())).collect(Collectors.toList());
    }

    @Override
    public GroupChatDTO fetchGroupWithAllMessage(int groupId) {
        Optional<GroupChatEntity> groupChatEntity = groupChatRepository.findById(groupId);
        groupChatEntity.get().setIsSeen(true);
        groupChatRepository.save(groupChatEntity.get());
        GroupChatDTO groupDTO = new GroupChatDTO();
        groupDTO.setId(groupChatEntity.get().getId());
        groupDTO.setSeen(true);

        int limit = 15;
        Pageable page = PageRequest.of(0, limit);
//        groupDTO.setMessageDTOList(messageRepository.findByGroupOrderByCreatAtDesc(groupChatEntity.get(), page).getContent()
//                .stream().map(item -> messageMapper.toMessageDTO(item)).collect(Collectors.toList()));
        LinkedList<MessageEntity> messageEntityLinkedList = new LinkedList<>
                (messageRepository.findByGroupOrderByCreatAtDesc(groupChatEntity.get(), page).getContent());
        List<MessageDTO> messageDTOList = new ArrayList<>();
        while(!messageEntityLinkedList.isEmpty()){
            messageDTOList.add(messageMapper.toMessageDTO(messageEntityLinkedList.removeLast()));
        }
        groupDTO.setMessageDTOList(messageDTOList);
        return groupDTO;
    }

    @Override
    public GroupChatEntity saveMessageWithGroup(MessageDTO messageDTO) {
        try {
            MessageEntity messageEntity = new MessageEntity();
            messageEntity.setMessage(messageDTO.getMessage());
            messageEntity.setSenderName(messageDTO.getSenderName());

            if(messageDTO.getGroupId() == 0){
                messageEntity.setReceiverName(messageDTO.getReceiverName());
                GroupChatEntity groupChatEntity = groupChatRepository.findBySenderName(messageDTO.getSenderName());
                messageEntity.setGroup(groupChatEntity);
                messageService.saveMessageByGroupId(groupChatEntity.getId(), messageDTO);
                return groupChatEntity;
            }else{
                GroupChatEntity groupChatEntity = groupChatRepository.findById(messageDTO.getGroupId()).get();
                messageEntity.setGroup(groupChatEntity);
                messageDTO.setReceiverName(groupChatEntity.getSenderName());
                messageService.saveMessageByGroupId(groupChatEntity.getId(), messageDTO);
                return groupChatEntity;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
