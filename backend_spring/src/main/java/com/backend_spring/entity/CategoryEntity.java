package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity(name = "category")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "category")
    private Set<CategoryBrandEntity> categoryBrands;

    @OneToMany(mappedBy = "category")
    private Set<ProductEntity> products;
}
