package com.backend_spring.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class FilterProductRequest {

    private int currentPage;

    private String searchKeyword;

    private List<Integer> brandIds;

    private List<Integer> categoryIds;

    private String sortType;

    private int totalItemEachPage;
}
