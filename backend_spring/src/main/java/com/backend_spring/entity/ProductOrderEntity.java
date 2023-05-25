package com.backend_spring.entity;

import com.backend_spring.entity.id.ProductOrderId;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "product_order")
@Setter
@Getter
@IdClass(ProductOrderId.class)
public class ProductOrderEntity {

    @Id
    private int productId;
    @Id
    private int orderId;

    @Column(name = "amount")
    private int amount;
    @Column(name = "price")
    private float price;
    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private ProductEntity product;
    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private OrderEntity orders;
}
