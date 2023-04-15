package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Setter
@Getter
@Entity(name = "product")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "main_image")
    private String mainImage;
    @Column(name = "amount_of_sold")
    private String amountOfSold;
    @Column(name = "price")
    private float price;
    @Column(name = "detail")
    private String detail;
    @Column(name = "create_at")
    private String createAt;
    @Column(name = "create_by")
    private String createBy;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private BrandEntity brand;

    @OneToMany(mappedBy = "product")
    private Set<BookmarkProductEntity> bookmarkProducts;
    @OneToMany(mappedBy = "product")
    private Set<ImageProductEntity> imageProducts;
    @OneToMany(mappedBy = "product")
    private Set<ProductOrderEntity> productOrders;
}

