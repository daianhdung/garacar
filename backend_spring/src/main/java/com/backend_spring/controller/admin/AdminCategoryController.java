package com.backend_spring.controller.admin;

import com.backend_spring.dto.CategoryDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.CategoryService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminCategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategory() {
        DataResponse dataResponse = new DataResponse();
        List<CategoryDTO> categoryDTOS = categoryService.getALLCategory();
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(categoryDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> geCategoryById(@PathVariable("id") int idCategory) {
        DataResponse dataResponse = new DataResponse();
        CategoryDTO categoryDTO = categoryService.getCategoryById(idCategory);
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(categoryDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/category")
    public ResponseEntity<?> insertCategory(@RequestParam("categoryDTO") String categoryDTO,
                                         @RequestParam(value = "mainImage", required = false) MultipartFile file){
        Gson gson = new Gson();
        CategoryDTO categoryDTOParser = gson.fromJson(categoryDTO,CategoryDTO.class);
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = categoryService.insertCategory(categoryDTOParser, file);
        dataResponse.setSuccess(isSuccess);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<?> updateCategoryById(@PathVariable("id") int idCategory, @RequestParam(name = "categoryDTO") String categoryDTO,
                                             @RequestParam(value = "mainImage", required = false) MultipartFile file) {
        DataResponse dataResponse = new DataResponse();
        Gson gson = new Gson();
        CategoryDTO categoryDTOParser = gson.fromJson(categoryDTO,CategoryDTO.class);
        boolean isSuccess = categoryService.updateCategory(idCategory, categoryDTOParser, file);
        dataResponse.setDesc("Update category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping ("/category/{id}")
    public ResponseEntity<?> updateCategoryById(@PathVariable("id") int idCategory) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = categoryService.deleteCategoryById(idCategory);
        dataResponse.setDesc("Delete category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
