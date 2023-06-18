package com.backend_spring.controller;

import com.backend_spring.dto.VisitorDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/visitor")
@CrossOrigin
public class VisitorController {

    @Autowired
    VisitorService visitorService;

    @GetMapping()
    public ResponseEntity<?> getVisitor(){
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> newVisitor(@RequestBody VisitorDTO visitorDTO){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setSuccess(visitorService.newVisitor(visitorDTO));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<?> endVisitor(@RequestBody VisitorDTO visitorDTO){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setSuccess(visitorService.updateEndVisitor(visitorDTO));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
