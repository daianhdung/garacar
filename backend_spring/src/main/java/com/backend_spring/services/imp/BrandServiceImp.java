package com.backend_spring.services.imp;

import com.backend_spring.dto.BrandDTO;
import com.backend_spring.entity.BrandEntity;
import com.backend_spring.repository.BrandRepository;
import com.backend_spring.services.BrandService;
import com.backend_spring.services.FileUploadService;
import com.backend_spring.utils.enumpackage.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImp implements BrandService {
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    FileUploadService fileUploadService;

    @Override
    public List<BrandDTO> getALLBrand() {
        List<BrandDTO> list = new ArrayList<>();
        brandRepository.findAll().forEach(brandEntity -> {
            BrandDTO brandDTO = new BrandDTO();
            brandDTO.setId(brandEntity.getId());
            brandDTO.setName(brandEntity.getName());
            brandDTO.setImage(Url.BrandImage.getPath() + brandEntity.getImage());
            list.add(brandDTO);
        });
        return list;
    }

    @Override
    public boolean insertBrand(BrandDTO brandDTO, MultipartFile file) {
        BrandEntity brand = new BrandEntity();
        brand.setName(brandDTO.getName());
        if (file != null) {
            boolean isUpload = fileUploadService.storedFile(file, "brand");
            if (isUpload) {
                brand.setImage(file.getOriginalFilename());
            } else {
                return false;
            }
        }
        brandRepository.save(brand);
        return true;

    }

    @Override
    public boolean updateBrand(int idBrand, BrandDTO brandDTO, MultipartFile file) {
        Optional<BrandEntity> brand = brandRepository.findById(idBrand);
        if (brand.isPresent()) {
            brand.get().setName(brandDTO.getName());
            if (file != null) {
                boolean isUploaded = fileUploadService.storedFile(file, "brand");
                if (isUploaded) {
                    brand.get().setImage(file.getOriginalFilename());
                } else {
                    return false;
                }
            }
            brandRepository.save(brand.get());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public BrandDTO getBrandById(int idBrand) {
        Optional<BrandEntity> brand = brandRepository.findById(idBrand);
        if (brand.isPresent()) {
            BrandDTO brandDTO = new BrandDTO();
            brandDTO.setId(brand.get().getId());
            brandDTO.setName(brand.get().getName());
            brandDTO.setImage(Url.BrandImage.getPath() + brand.get().getImage());
            return brandDTO;
        }
        return null;
    }


    @Override
    public boolean deleteBrandById(int idBrand) {
        try {
            brandRepository.deleteById(idBrand);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
