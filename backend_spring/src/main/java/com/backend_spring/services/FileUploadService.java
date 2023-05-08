package com.backend_spring.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    String storedFile(MultipartFile file, String nameDirectory);

    boolean deleteFile(String fileName, String nameDirectory);

    Resource loadFileByName(String fileName, String nameDirectory);

    String getUniqueFileName(String fileName);
}
