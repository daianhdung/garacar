package com.backend_spring.entity.id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class CategoryBrandId implements Serializable {


    @Column(name = "category_id")
    private int categoryId;
    @Column(name = "brand_id")
    private int brandId;


}
