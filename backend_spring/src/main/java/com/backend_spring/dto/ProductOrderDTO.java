package com.backend_spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductOrderDTO {
    private String name;

    private String mainImage;

    private String size;

    private int amount;

    private float price;

}
