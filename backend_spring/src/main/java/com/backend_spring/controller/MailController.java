package com.backend_spring.controller;

import com.backend_spring.dto.MailDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
@CrossOrigin
public class MailController {

    @Autowired
    MailService mailService;

    @PostMapping()
    public ResponseEntity<?> postMail(@RequestBody MailDTO mailDTO){
        boolean isSuccess = mailService.insertMail(mailDTO);

        DataResponse dataResponse = new DataResponse();
        if( isSuccess) {
            mailService.sendEmail(mailService.autoReply(mailDTO));
            dataResponse.setStatus(HttpStatus.OK.value());
        }
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
