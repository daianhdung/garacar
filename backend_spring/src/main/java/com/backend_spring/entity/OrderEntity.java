package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity(name = "orders")
@Getter
@Setter
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "fee_ship")
    private float feeShip;

    @Column(name = "temp_total")
    private float tempTotal;

    @Column(name = "total")
    private float total;

    @Column(name = "delivery_address")
    private String deliveryAddress;

    @Column(name = "create_at")
    private Timestamp createAt;

    @Column(name = "order_token")
    private String orderToken;

    @Column(name = "coupon")
    private float coupon;


    @OneToMany(mappedBy = "orders")
    private Set<ProductOrderEntity> productOrders;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserEntity users;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private StatusEntity status;

}
