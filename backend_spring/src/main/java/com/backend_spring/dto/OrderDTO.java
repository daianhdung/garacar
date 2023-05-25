package com.backend_spring.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class OrderDTO {

    private UserDTO userDTO;

    private List<ProductDTO> productDTOList;
    private List<Map<String,String>> products;

    private float coupon;

    private String deliveryAddress;

    private int id;
    private int tempTotal;
    private int total;
    private int feeShip;

    private int statusId;
    private String status;

    private String orderToken;
    private List<ProductOrderDTO> productOrderDTOList;
}
