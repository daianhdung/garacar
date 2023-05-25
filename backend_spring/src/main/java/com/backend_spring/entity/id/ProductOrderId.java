package com.backend_spring.entity.id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductOrderId implements Serializable {

    @Column(name = "order_id")
    private int orderId;
    @Column(name = "product_id")
    private int productId;
}
