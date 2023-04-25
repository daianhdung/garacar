package com.backend_spring.controller.admin;

import com.backend_spring.dto.BrandDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.BrandService;
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
public class AdminBrandController {

    @Autowired
    BrandService brandService;

    @GetMapping("/brands")
    public ResponseEntity<?> getAllBrand() {
        DataResponse dataResponse = new DataResponse();
        List<BrandDTO> brandDTOS = brandService.getALLBrand();
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(brandDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/brand/{id}")
    public ResponseEntity<?> geBrandById(@PathVariable("id") int idBrand) {
        DataResponse dataResponse = new DataResponse();
        BrandDTO brandDTO = brandService.getBrandById(idBrand);
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(brandDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/brand")
    public ResponseEntity<?> insertBrand(@RequestParam("brandDTO") String brandDTO,
                                         @RequestParam(value = "mainImage", required = false) MultipartFile file){
        Gson gson = new Gson();
        BrandDTO brandDTOParser = gson.fromJson(brandDTO,BrandDTO.class);
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = brandService.insertBrand(brandDTOParser, file);
        dataResponse.setSuccess(isSuccess);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/brand/{id}")
    public ResponseEntity<?> updateBrandById(@PathVariable("id") int idBrand, @RequestParam(name = "brandDTO") String brandDTO,
                                             @RequestParam(value = "mainImage", required = false) MultipartFile file) {
        DataResponse dataResponse = new DataResponse();
        Gson gson = new Gson();
        BrandDTO brandDTOParser = gson.fromJson(brandDTO,BrandDTO.class);
        boolean isSuccess = brandService.updateBrand(idBrand, brandDTOParser, file);
        dataResponse.setDesc("Update brand");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping ("/brand/{id}")
    public ResponseEntity<?> updateBrandById(@PathVariable("id") int idBrand) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = brandService.deleteBrandById(idBrand);
        dataResponse.setDesc("Delete brand");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
