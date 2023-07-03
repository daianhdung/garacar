package com.backend_spring.utils.enumpackage;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Url {
//
//    Root("http://localhost:8080/"),
//    BrandImage("http://localhost:8080/api/uploads/brand/"),
//    CategoryImage("http://localhost:8080/api/uploads/category/"),
//    ProductsImage("http://localhost:8080/api/uploads/products/");

//
//    Root("http://192.168.1.7:8080/"),
//    BrandImage("http://192.168.1.7:8080/api/uploads/brand/"),
//    CategoryImage("http://192.168.1.7:8080/api/uploads/category/"),
//    ProductsImage("http://192.168.1.7:8080/api/uploads/products/");

//
    Root("http://21.215.60.30:8080/"),
    BrandImage("http://21.215.60.30:8080/api/uploads/brand/"),
    CategoryImage("http://21.215.60.30:8080/api/uploads/category/"),
    ProductsImage("http://21.215.60.30:8080/api/uploads/products/");

    private String path;
}
