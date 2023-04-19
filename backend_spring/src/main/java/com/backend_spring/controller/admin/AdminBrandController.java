package com.backend_spring.controller.admin;

import com.backend_spring.dto.BrandDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin-brand")
@CrossOrigin
public class AdminBrandController {

    @Autowired
    BrandService brandService;

    @GetMapping()
    public ResponseEntity<?> getAllBrand() {
        DataResponse dataResponse = new DataResponse();
        List<BrandDTO> brandDTOS = brandService.getALLBrand();
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(brandDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> insertBrand(@RequestParam("image") MultipartFile file){
        BrandDTO brandDTO = new BrandDTO();
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = brandService.insertBrand(brandDTO, file);
        dataResponse.setSuccess(isSuccess);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
