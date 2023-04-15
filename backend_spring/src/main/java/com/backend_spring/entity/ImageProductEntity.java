package com.backend_spring.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "image_product")
@Setter
@Getter
public class ImageProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;
}