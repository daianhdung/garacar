package com.backend_spring.entity;

import com.backend_spring.entity.id.CategoryBrandId;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@IdClass(CategoryBrandId.class)
@Entity(name = "category_brand")
public class CategoryBrandEntity {

    @Id
    private int categoryId;
    @Id
    private int brandId;
    @ManyToOne
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    private CategoryEntity category;
    @ManyToOne
    @JoinColumn(name = "brand_id", insertable = false, updatable = false)
    private BrandEntity brand;


}
