package com.backend_spring.utils.enumpackage;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Url {

//    Root("http://localhost:8080/"),
//    BrandImage("http://localhost:8080/api/uploads/brand/"),
//    CategoryImage("http://localhost:8080/api/uploads/category/"),
//    ProductsImage("http://localhost:8080/api/uploads/products/");


    Root("http://21.241.203.220:8080/"),
    BrandImage("http://21.241.203.220:8080/api/uploads/brand/"),
    CategoryImage("http://21.241.203.220:8080/api/uploads/category/"),
    ProductsImage("http://21.241.203.220:8080/api/uploads/products/");

    private String path;
}
