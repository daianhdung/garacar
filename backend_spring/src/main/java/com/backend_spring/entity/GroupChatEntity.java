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

    @CreationTimestamp
    @Column(name = "create_at")
    private LocalDateTime creatAt;

    @OneToMany(mappedBy = "group")
    private Set<MessageEntity> messageEntitySet;

}
