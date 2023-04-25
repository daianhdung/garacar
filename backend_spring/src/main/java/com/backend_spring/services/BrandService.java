package com.backend_spring.services;

import com.backend_spring.dto.BrandDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BrandService {
    List<BrandDTO> getALLBrand();
    BrandDTO getBrandById(int idBrand);

    boolean insertBrand(BrandDTO brandDTO, MultipartFile file);

    boolean updateBrand(int idBrand, BrandDTO brandDTO, MultipartFile file);

    boolean deleteBrandById(int idBrand);
}
