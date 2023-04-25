package com.backend_spring.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    boolean storedFile(MultipartFile file, String nameDirectory);

    Resource loadFileByName(String fileName, String nameDirectory);
}
