package com.backend_spring.controller;


import com.backend_spring.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/uploads")
public class FileUploadController {

    @Autowired
    FileUploadService fileUploadService;


    @GetMapping("/{directory}/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable("fileName") String fileName, @PathVariable("directory") String directory
            , HttpServletRequest request)
            throws IOException {
        Resource resource = fileUploadService.loadFileByName(fileName, directory);
        String contentType = "";
        if(resource != null){
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }

        if(contentType == null || contentType.equals("")) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

}
