package com.backend_spring.controller;

import com.backend_spring.dto.BrandDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/brand")
@CrossOrigin
public class BrandController {

    @Autowired
    BrandService brandService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllBrand() {
        DataResponse dataResponse = new DataResponse();
        List<BrandDTO> brandDTOS = brandService.getALLBrand();
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(brandDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
