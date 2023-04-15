package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "coupon")
@Setter
@Getter
public class CouponEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "rate")
    private float rate;


}
