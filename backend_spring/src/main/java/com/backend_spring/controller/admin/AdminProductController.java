package com.backend_spring.controller.admin;

import com.backend_spring.dto.ProductDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.ProductService;
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
public class AdminProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<?> getAllProduct() {
        DataResponse dataResponse = new DataResponse();
        List<ProductDTO> productDTOS = productService.getALLProduct();
        dataResponse.setDesc("get All product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> geProductById(@PathVariable("id") int idProduct) {
        DataResponse dataResponse = new DataResponse();
        ProductDTO productDTO = productService.getProductById(idProduct);
        dataResponse.setDesc("get All product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/product")
    public ResponseEntity<?> insertProduct(@RequestParam("productDTO") String productDTO,
                                            @RequestParam(value = "mainImage", required = false) MultipartFile file,
                                           @RequestParam(value = "images", required = false)MultipartFile[] multipartFiles){
        Gson gson = new Gson();
        ProductDTO productDTOParser = gson.fromJson(productDTO,ProductDTO.class);
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = productService.insertProduct(productDTOParser, file, multipartFiles);
        dataResponse.setSuccess(isSuccess);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<?> updateProductById(@PathVariable("id") int idProduct, @RequestParam(name = "productDTO") String productDTO,
                                                @RequestParam(value = "mainImage", required = false) MultipartFile file,
                                               @RequestParam(value = "images", required = false)MultipartFile[] multipartFiles) {
        DataResponse dataResponse = new DataResponse();
        Gson gson = new Gson();
        ProductDTO productDTOParser = gson.fromJson(productDTO,ProductDTO.class);
        boolean isSuccess = productService.updateProduct(idProduct, productDTOParser, file, multipartFiles);
        dataResponse.setDesc("Update product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping ("/product/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable("id") int idProduct) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = productService.deleteProductById(idProduct);
        dataResponse.setDesc("Delete product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
