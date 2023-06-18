package com.backend_spring.services.imp;

import com.backend_spring.dto.CategoryDTO;
import com.backend_spring.dto.ListProductDTO;
import com.backend_spring.dto.ProductDTO;
import com.backend_spring.entity.CategoryEntity;
import com.backend_spring.entity.ImageProductEntity;
import com.backend_spring.entity.ProductEntity;
import com.backend_spring.payload.request.FilterProductRequest;
import com.backend_spring.repository.BrandRepository;
import com.backend_spring.repository.CategoryRepository;
import com.backend_spring.repository.ImageRepository;
import com.backend_spring.repository.ProductRepository;
import com.backend_spring.services.FileUploadService;
import com.backend_spring.services.ProductService;
import com.backend_spring.utils.enumpackage.DirectoryUploads;
import com.backend_spring.utils.enumpackage.Url;
import com.backend_spring.utils.formatstring.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
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

    @Autowired
    StringUtil stringUtil;

    @Override
    public List<ProductDTO> getALLProduct() {
        List<ProductDTO> list = new ArrayList<>();
        productRepository.findAll().forEach(productEntity -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(productEntity.getId());
            productDTO.setName(productEntity.getName());
            productDTO.setSpecification(productEntity.getSpecification());
            productDTO.setSpecialOffer(productEntity.getSpecialOffer());
            productDTO.setMainImage(Url.ProductsImage.getPath() + productEntity.getMainImage());
            productDTO.setBrandName(productEntity.getBrand() != null ? productEntity.getBrand().getName() : "");
            productDTO.setCategoryName(productEntity.getCategory() != null ? productEntity.getCategory().getName() : "");
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
            productDTO.setDescription(product.get().getDescription());
            productDTO.setSpecification(product.get().getSpecification());
            productDTO.setSpecialOffer(product.get().getSpecialOffer());

            if (product.get().getBrand() != null) {
                productDTO.setBrandId(product.get().getBrand().getId());
                productDTO.setBrandName(product.get().getBrand().getName());
            }

            if (product.get().getCategory() != null) {
                productDTO.setCategoryId(product.get().getCategory().getId());
                productDTO.setCategoryName(product.get().getCategory().getName());
            }

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
        product.setDescription(productDTO.getDescription());
        productDTO.setSpecification(productDTO.getSpecification());
        productDTO.setSpecialOffer(productDTO.getSpecialOffer());
        product.setBrand(brandRepository.findById(productDTO.getBrandId()).orElse(null));
        product.setCategory(categoryRepository.findById(productDTO.getCategoryId()).orElse(null));
        if (file != null) {
            String isUpload = fileUploadService.storedFile(file, DirectoryUploads.ProductDirectory.getDirectory());
            if (!isUpload.isEmpty()) {
                product.setMainImage(isUpload);
            } else {
                return false;
            }
        }
        try {
            Set<ImageProductEntity> imageProductList = new HashSet<>();
            if (multipartFiles != null) {
                Arrays.stream(multipartFiles).forEach(item -> {
                    String fileName = fileUploadService.storedFile(item, DirectoryUploads.ProductDirectory.getDirectory());
                    ImageProductEntity imageProduct = new ImageProductEntity();
                    imageProduct.setName(fileName);
                    imageProduct.setProduct(product);
                    imageProductList.add(imageProduct);
                });
                product.setImageProducts(imageProductList);
            }
            productRepository.save(product);
            return true;
        } catch (Exception e) {
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
        product.get().setDescription(productDTO.getDescription());
        product.get().setSpecification(productDTO.getSpecification());
        product.get().setSpecialOffer(productDTO.getSpecialOffer());
        product.get().setBrand(brandRepository.findById(productDTO.getBrandId()).orElse(null));
        product.get().setCategory(categoryRepository.findById(productDTO.getCategoryId()).orElse(null));
        if (file != null) {
            String isUpload = fileUploadService.storedFile(file, DirectoryUploads.ProductDirectory.getDirectory());
            if (!isUpload.isEmpty()) {
                product.get().setMainImage(isUpload);
            } else {
                return false;
            }
        }
        try {
            Set<ImageProductEntity> imageProductList = new HashSet<>();
            if (multipartFiles != null) {
                imageRepository.deleteAllByProductId(idProduct);
                Arrays.stream(multipartFiles).forEach(item -> {
                    String fileName = fileUploadService.storedFile(item, DirectoryUploads.ProductDirectory.getDirectory());
                    ImageProductEntity imageProduct = new ImageProductEntity();
                    imageProduct.setName(fileName);
                    imageProduct.setProduct(product.get());
                    imageProductList.add(imageProduct);
                });
                product.get().setImageProducts(imageProductList);
            }
            productRepository.save(product.get());
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean deleteProductById(int idProduct) {
        try {
            Optional<ProductEntity> product = productRepository.findById(idProduct);
            fileUploadService.deleteFile(product.get().getMainImage(), DirectoryUploads.ProductDirectory.getDirectory());
            product.get().getImageProducts().forEach(item -> {
                fileUploadService.deleteFile(item.getName(), DirectoryUploads.ProductDirectory.getDirectory());
            });
            productRepository.deleteById(idProduct);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public ListProductDTO getProductByFilter(FilterProductRequest filterProduct) {
        String sortType = filterProduct.getSortType();
        int totalItem = filterProduct.getTotalItemEachPage();
        int currentPage = filterProduct.getCurrentPage() - 1;
        Pageable pageable = PageRequest.of(currentPage, totalItem);

        if (sortType.equals("nameAsc")) {
            pageable = PageRequest.of(currentPage, totalItem, Sort.by("name").ascending());
        } else if (sortType.equals("nameDesc")) {
            pageable = PageRequest.of(currentPage, totalItem, Sort.by("name").descending());
        } else if (sortType.equals("priceAsc")) {
            pageable = PageRequest.of(currentPage, totalItem, Sort.by("price").ascending());
        } else if (sortType.equals("priceDesc")) {
            pageable = PageRequest.of(currentPage, totalItem, Sort.by("price").descending());
        }

        Page<ProductEntity> page;

        if (filterProduct.getCategoryIds().size() > 0 || filterProduct.getBrandIds().size() > 0) {
            page = productRepository
                    .findByNameContainingAndCategoryIdInOrBrandIdIn
                            (filterProduct.getSearchKeyword()
                                    , filterProduct.getCategoryIds()
                                    , filterProduct.getBrandIds()
                                    , pageable);
        } else {
            page = productRepository.findByNameContainingIgnoreCase(filterProduct.getSearchKeyword(), pageable);
        }


        List<ProductDTO> productDTOList = page.getContent()
                .stream()
                .map(item -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(item.getId());
            productDTO.setName(item.getName());
            productDTO.setPrice(item.getPrice());
            productDTO.setMainImage(Url.ProductsImage.getPath() + item.getMainImage());
            return productDTO;
        }).collect(Collectors.toList());

        ListProductDTO listProductDTO = new ListProductDTO();
        listProductDTO.setProductDTOList(productDTOList);
        listProductDTO.setTotalPage(page.getTotalPages());
        listProductDTO.setCurrentPage(filterProduct.getCurrentPage());
        return listProductDTO;
    }

    @Override
    public List<ProductDTO> searchProduct(String name) {
        Pageable pageable = null;
        name = stringUtil.removeWhiteSpaceBeginAndEnd(name);
        Page<ProductEntity> page = productRepository.findByNameContainingIgnoreCase(name, pageable);

        return page.getContent()
                .stream()
                .map(item -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(item.getId());
            productDTO.setName(item.getName());
            productDTO.setMainImage(Url.ProductsImage.getPath() + item.getMainImage());
            productDTO.setPrice(item.getPrice());
            return productDTO;
        }).collect(Collectors.toList());
    }
}
