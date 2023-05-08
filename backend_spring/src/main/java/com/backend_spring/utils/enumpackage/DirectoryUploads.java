package com.backend_spring.utils.enumpackage;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DirectoryUploads {

    ProductDirectory("products"),

    CategoryDirectory("category"),

    BrandDirectory("brand");

    String directory;
}
