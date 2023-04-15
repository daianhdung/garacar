package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "visitor")
@Getter
@Setter
public class VisitorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "ip_address")
    private String ipAddress;
    @Column(name = "count")
    private int count;
    @Column(name = "start_time")
    private String startTime;
    @Column(name = "end_time")
    private String endTime;
}
