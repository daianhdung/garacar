package com.backend_spring.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ListProductDTO {

    List<ProductDTO> productDTOList;

    private int totalPage;

    private int currentPage;
}
