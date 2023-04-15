package com.backend_spring.entity.id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class ProductOrderId implements Serializable {

    @Column(name = "order_id")
    private int orderId;
    @Column(name = "product_id")
    private int productId;
}
