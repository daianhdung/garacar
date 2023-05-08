package com.backend_spring.services.imp;

import com.backend_spring.dto.BrandDTO;
import com.backend_spring.dto.CategoryDTO;
import com.backend_spring.entity.BrandEntity;
import com.backend_spring.entity.CategoryEntity;
import com.backend_spring.repository.CategoryRepository;
import com.backend_spring.services.CategoryService;
import com.backend_spring.services.FileUploadService;
import com.backend_spring.utils.enumpackage.DirectoryUploads;
import com.backend_spring.utils.enumpackage.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    FileUploadService fileUploadService;

    @Override
    public List<CategoryDTO> getALLCategory() {
        List<CategoryDTO> list = new ArrayList<>();
        categoryRepository.findAll().forEach(categoryEntity -> {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(categoryEntity.getId());
            categoryDTO.setName(categoryEntity.getName());
            if(categoryEntity.getImage() != null){
                categoryDTO.setImage(Url.CategoryImage.getPath() + categoryEntity.getImage());
            }
            list.add(categoryDTO);
        });
        return list;
    }

    @Override
    public CategoryDTO getCategoryById(int idCategory) {
        Optional<CategoryEntity> category = categoryRepository.findById(idCategory);
        if (category.isPresent()) {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(category.get().getId());
            categoryDTO.setName(category.get().getName());
            categoryDTO.setImage(Url.CategoryImage.getPath() + category.get().getImage());
            return categoryDTO;
        }
        return null;
    }

    @Override
    public boolean insertCategory(CategoryDTO categoryDTO, MultipartFile file) {
        CategoryEntity category = new CategoryEntity();
        category.setName(categoryDTO.getName());
        if (file != null) {
            String isUpload = fileUploadService.storedFile(file, DirectoryUploads.CategoryDirectory.getDirectory());
            if (!isUpload.isEmpty()) {
                category.setImage(isUpload);
            } else {
                return false;
            }
        }
        categoryRepository.save(category);
        return true;
    }

    @Override
    public boolean updateCategory(int idCategory, CategoryDTO categoryDTO, MultipartFile file) {
        Optional<CategoryEntity> category = categoryRepository.findById(idCategory);
        if (category.isPresent()) {
            category.get().setName(categoryDTO.getName());
            if (file != null) {
                String isUpload = fileUploadService.storedFile(file, DirectoryUploads.CategoryDirectory.getDirectory());
                if (!isUpload.isEmpty()) {
                    category.get().setImage(isUpload);
                } else {
                    return false;
                }
            }
            categoryRepository.save(category.get());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteCategoryById(int idCategory) {
        try {
            Optional<CategoryEntity> category = categoryRepository.findById(idCategory);
            fileUploadService.deleteFile(category.get().getImage(), DirectoryUploads.CategoryDirectory.getDirectory());
            categoryRepository.deleteById(idCategory);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
