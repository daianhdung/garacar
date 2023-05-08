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

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

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
    public String storedFile(MultipartFile file, String nameDirectory) {
        String fileName = getUniqueFileName(StringUtils.cleanPath(file.getOriginalFilename()));
        try {
            Path directoryPath = Paths.get(rootPath.toString(), nameDirectory);
            if (Files.notExists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            Path filePath = directoryPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (Exception e) {
            System.out.println("Lỗi save file" + e.getMessage());
            return "";
        }
    }

    @Override
    public boolean deleteFile(String fileName, String nameDirectory) {
        try {
            Path directoryPath = Paths.get(rootPath.toString(), nameDirectory);
            File file = new File(directoryPath + "/" + fileName);
            if (file.exists()) {
                file.delete();
            }
            return true;
        } catch (Exception e) {
            System.out.println("Lỗi delete file" + e.getMessage());
            return false;
        }
    }


    @Override
    public Resource loadFileByName(String fileName, String nameDirectory) {
        try {
            Path directoryPath = Paths.get(rootPath.toString(), nameDirectory);
            Path path = directoryPath.resolve(fileName).normalize();

            Resource resource = new UrlResource(path.toUri());
            if (resource.exists()) {
                return resource;
            }
        } catch (Exception e) {
            System.out.println("Lỗi đọc file" + e.getMessage());
        }
        return null;
    }

    @Override
    public String getUniqueFileName(String fileName) {
        LocalDateTime now = LocalDateTime.now();
        String timestamp = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String extension = fileName.substring(fileName.lastIndexOf("."));
        String uniqueId = UUID.randomUUID().toString();
        return timestamp + "_" + uniqueId + extension;
    }
}