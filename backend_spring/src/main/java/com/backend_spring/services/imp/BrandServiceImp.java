package com.backend_spring.services.imp;

import com.backend_spring.dto.BrandDTO;
import com.backend_spring.entity.BrandEntity;
import com.backend_spring.repository.BrandRepository;
import com.backend_spring.services.BrandService;
import com.backend_spring.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

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
            list.add(brandDTO);
        });
        return list;
    }

    @Override
    public boolean insertBrand(BrandDTO brandDTO, MultipartFile file) {
        BrandEntity brand = new BrandEntity();
        brand.setName("test");
        boolean isUpload = fileUploadService.storedFile(file, "brand");
        if (isUpload) {
            brand.setImage(file.getOriginalFilename());
        } else {
            return false;
        }
        try {
            brandRepository.save(brand);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }


}
