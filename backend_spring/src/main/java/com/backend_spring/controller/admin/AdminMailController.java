package com.backend_spring.controller.admin;

import com.backend_spring.dto.MailDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminMailController {

    @Autowired
    MailService mailService;

    @GetMapping("/mails")
    public ResponseEntity<?> getAllMail() {
        DataResponse dataResponse = new DataResponse();
        List<MailDTO> mailDTOS = mailService.getALLMail();
        dataResponse.setDesc("get All mail");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(mailDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/mail/{id}")
    public ResponseEntity<?> geMailById(@PathVariable("id") int idMail) {
        DataResponse dataResponse = new DataResponse();
        MailDTO mailDTO = mailService.getMailById(idMail);
        dataResponse.setDesc("get mail by id");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(mailDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
