package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity(name = "brand")
public class BrandEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "brand")
    private Set<CategoryBrandEntity> categoryBrands;

    @OneToMany(mappedBy = "brand")
    private Set<ProductEntity> products;
}
