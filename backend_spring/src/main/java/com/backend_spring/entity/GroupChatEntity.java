package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity(name = "group_chat")
@Setter
@Getter
public class GroupChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "receiver_name")
    private String receiverName;

    @CreationTimestamp
    @Column(name = "create_at")
    private LocalDateTime creatAt;

    @Column(name = "is_seen", columnDefinition = "boolean default false")
    private boolean isSeen;

    @OneToMany(mappedBy = "group")
    private Set<MessageEntity> messageEntitySet;

}
