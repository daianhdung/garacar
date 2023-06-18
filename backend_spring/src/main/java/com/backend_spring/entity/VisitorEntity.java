package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "visitor")
@Getter
@Setter
public class VisitorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "ip_address")
    private String ipAddress;
    @Column(name = "start_time")
    @CreationTimestamp
    private LocalDateTime startTime;
    @Column(name = "end_time")
    private LocalDateTime endTime;
}
