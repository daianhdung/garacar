package com.backend_spring.entity;

import com.backend_spring.entity.BrandEntity;
import com.backend_spring.entity.GroupChatEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "message")
@Setter
@Getter
public class MessageEntity {

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

    @Column(name = "message")
    private String message;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private GroupChatEntity group;


}
