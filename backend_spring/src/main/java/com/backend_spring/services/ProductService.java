package com.backend_spring.services;

import com.backend_spring.dto.CategoryDTO;
import com.backend_spring.dto.ProductDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductDTO> getALLProduct();
    ProductDTO getProductById(int idProduct);

    boolean insertProduct(ProductDTO productDTO, MultipartFile file, MultipartFile[] multipartFiles);

    boolean updateProduct(int idProduct, ProductDTO productDTO, MultipartFile file, MultipartFile[] multipartFiles);

    boolean deleteProductById(int idProduct);
}
