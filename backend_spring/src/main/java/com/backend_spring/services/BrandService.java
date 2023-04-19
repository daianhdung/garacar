package com.backend_spring.services;

import com.backend_spring.dto.BrandDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BrandService {
    List<BrandDTO> getALLBrand();

    boolean insertBrand(BrandDTO brandDTO, MultipartFile file);
}
