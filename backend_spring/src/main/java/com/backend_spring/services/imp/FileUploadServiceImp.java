package com.backend_spring.services.imp;

import com.backend_spring.config.FileStorageProperties;
import com.backend_spring.services.FileUploadService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileUploadServiceImp implements FileUploadService {

    private Path rootPath;


    public FileUploadServiceImp(FileStorageProperties fileStorageProperties) throws IOException {
        this.rootPath = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        if (Files.notExists(this.rootPath)) {
            Files.createDirectories(rootPath);
        }
    }




    @Override
    public boolean storedFile(MultipartFile file, String nameDirectory) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Path directoryPath = Paths.get(rootPath.toString(), nameDirectory);
            if (Files.notExists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            Path filePath = directoryPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (Exception e) {
            System.out.println("Lỗi save file" + e.getMessage());
            return false;
        }
    }


    @Override
    public Resource loadFileByName(String fileName) {
        try {
            Path path = this.rootPath.resolve(fileName).normalize();

            Resource resource = new UrlResource(path.toUri());
            if (resource.exists()) {
                return resource;
            }
        } catch (Exception e) {
            System.out.println("Lỗi đọc file" + e.getMessage());
        }
        return null;
    }
}