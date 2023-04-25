package com.backend_spring.services;

import com.backend_spring.dto.BrandDTO;
import com.backend_spring.dto.CategoryDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    List<CategoryDTO> getALLCategory();
    CategoryDTO getCategoryById(int idCategory);

    boolean insertCategory(CategoryDTO categoryDTO, MultipartFile file);

    boolean updateCategory(int idCategory, CategoryDTO categoryDTO, MultipartFile file);

    boolean deleteCategoryById(int idCategory);
}
