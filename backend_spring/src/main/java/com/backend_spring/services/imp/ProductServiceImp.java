package com.backend_spring.services.imp;

import com.backend_spring.dto.CategoryDTO;
import com.backend_spring.dto.ProductDTO;
import com.backend_spring.entity.CategoryEntity;
import com.backend_spring.entity.ImageProductEntity;
import com.backend_spring.entity.ProductEntity;
import com.backend_spring.repository.BrandRepository;
import com.backend_spring.repository.CategoryRepository;
import com.backend_spring.repository.ImageRepository;
import com.backend_spring.repository.ProductRepository;
import com.backend_spring.services.FileUploadService;
import com.backend_spring.services.ProductService;
import com.backend_spring.utils.enumpackage.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements ProductService {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    FileUploadService fileUploadService;
    @Autowired
    BrandRepository brandRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ImageRepository imageRepository;

    @Override
    public List<ProductDTO> getALLProduct() {
        List<ProductDTO> list = new ArrayList<>();
        productRepository.findAll().forEach(productEntity -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(productEntity.getId());
            productDTO.setName(productEntity.getName());
            productDTO.setMainImage(Url.ProductsImage.getPath() + productEntity.getMainImage());
            productDTO.setBrandName(productEntity.getBrand().getName());
            productDTO.setCategoryName(productEntity.getCategory().getName());
            productDTO.setPrice(productEntity.getPrice());
            list.add(productDTO);
        });
        return list;
    }

    @Override
    public ProductDTO getProductById(int idProduct) {
        Optional<ProductEntity> product = productRepository.findById(idProduct);
        if (product.isPresent()) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.get().getId());
            productDTO.setName(product.get().getName());
            productDTO.setPrice(product.get().getPrice());
            productDTO.setBrandId(product.get().getBrand().getId());
            productDTO.setCategoryId(product.get().getCategory().getId());
            productDTO.setBrandName(product.get().getBrand().getName());
            productDTO.setCategoryName(product.get().getCategory().getName());
            productDTO.setMainImage(Url.ProductsImage.getPath() + product.get().getMainImage());

            List<String> images = product.get()
                    .getImageProducts()
                    .stream()
                    .map(item -> Url.ProductsImage.getPath() + item.getName())
                    .collect(Collectors.toList());
            productDTO.setImages(images);
            return productDTO;
        }
        return null;
    }

    @Override
    public boolean insertProduct(ProductDTO productDTO, MultipartFile file, MultipartFile[] multipartFiles) {
        ProductEntity product = new ProductEntity();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setBrand(brandRepository.findById(productDTO.getBrandId()).orElse(null));
        product.setCategory(categoryRepository.findById(productDTO.getCategoryId()).orElse(null));
        if (file != null) {
            boolean isUpload = fileUploadService.storedFile(file, "products");
            if (isUpload) {
                product.setMainImage(file.getOriginalFilename());
            } else {
                return false;
            }
        }
        try {
            Set<ImageProductEntity> imageProductList = new HashSet<>();
            if(multipartFiles != null){
                Arrays.stream(multipartFiles).forEach(item -> {
                    fileUploadService.storedFile(item, "products");
                    ImageProductEntity imageProduct = new ImageProductEntity();
                    imageProduct.setName(item.getOriginalFilename());
                    imageProduct.setProduct(product);
                    imageProductList.add(imageProduct);
                });
                product.setImageProducts(imageProductList);
            }
            productRepository.save(product);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    @Transactional
    public boolean updateProduct(int idProduct, ProductDTO productDTO, MultipartFile file, MultipartFile[] multipartFiles) {
        Optional<ProductEntity> product = productRepository.findById(idProduct);
        product.get().setName(productDTO.getName());
        product.get().setPrice(productDTO.getPrice());
        product.get().setBrand(brandRepository.findById(productDTO.getBrandId()).orElse(null));
        product.get().setCategory(categoryRepository.findById(productDTO.getCategoryId()).orElse(null));
        if (file != null) {
            boolean isUpload = fileUploadService.storedFile(file, "products");
            if (isUpload) {
                product.get().setMainImage(file.getOriginalFilename());
            } else {
                return false;
            }
        }
        try {
            Set<ImageProductEntity> imageProductList = new HashSet<>();
            if(multipartFiles != null){
                imageRepository.deleteAllByProductId(idProduct);
                Arrays.stream(multipartFiles).forEach(item -> {
                    fileUploadService.storedFile(item, "products");
                    ImageProductEntity imageProduct = new ImageProductEntity();
                    imageProduct.setName(item.getOriginalFilename());
                    imageProduct.setProduct(product.get());
                    imageProductList.add(imageProduct);
                });
                product.get().setImageProducts(imageProductList);
            }
            productRepository.save(product.get());
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean deleteProductById(int idProduct) {
        try {
            productRepository.deleteById(idProduct);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
