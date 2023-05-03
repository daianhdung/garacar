package com.backend_spring.controller;

import com.backend_spring.dto.ListProductDTO;
import com.backend_spring.dto.ProductDTO;
import com.backend_spring.payload.request.FilterProductRequest;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllProduct() {
        DataResponse dataResponse = new DataResponse();
        List<ProductDTO> productDTOS = productService.getALLProduct();
        dataResponse.setDesc("get All product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> geProductById(@PathVariable("id") int idProduct) {
        DataResponse dataResponse = new DataResponse();
        ProductDTO productDTO = productService.getProductById(idProduct);
        dataResponse.setDesc("get product by id");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/filter")
    public ResponseEntity<?> getProductWithPageByFilter(@RequestBody FilterProductRequest filterProduct) {
        ListProductDTO productDTOList = productService.getProductByFilter(filterProduct);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(productDTOList);
        dataResponse.setSuccess(true);
        dataResponse.setDesc("get product with current page by filter");
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/search-product")
    public ResponseEntity<?> searchProduct(@RequestParam("keyword") String name,
                                           @RequestParam("type") String type){
        List<ProductDTO> productDTOList = productService.searchProduct(name);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setStatus(200);
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTOList);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
