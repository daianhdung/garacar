package com.backend_spring.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
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
    private int amountOfSold;
    @Column(name = "price")
    private float price;
    @Column(name = "description")
    private String description;
    @Column(name = "detail")
    private String detail;
    @Column(name = "create_at")
    private Timestamp createAt;
    @Column(name = "create_by")
    private String createBy;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private BrandEntity brand;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")
    private Set<BookmarkProductEntity> bookmarkProducts;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")
    private Set<ImageProductEntity> imageProducts;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")
    private Set<ProductOrderEntity> productOrders;

    @PrePersist
    public void setCreatedAt() {
        this.createAt = new Timestamp(System.currentTimeMillis());
    }
}

