package com.backend_spring.controller;

import com.backend_spring.dto.CategoryDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllCategory() {
        DataResponse dataResponse = new DataResponse();
        List<CategoryDTO> categoryDTOS = categoryService.getALLCategory();
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(categoryDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
