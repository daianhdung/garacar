package com.backend_spring.dto;

import com.backend_spring.entity.BrandEntity;
import com.backend_spring.entity.CategoryEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProductDTO {
    private int id;

    private String name;

    private float price;

    private String detail;

    private String mainImage;

    private int brandId;

    private int categoryId;

    private BrandEntity brand;
    private CategoryEntity category;

    private String brandName;

    private String categoryName;

    private List<String> images;

    private int quantity;

    private int totalPage;

    private int currentPage;

}
