package com.backend_spring.controller.admin;

import com.backend_spring.dto.RoleDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminRoleController {

    @Autowired
    RoleService roleService;

    @GetMapping("/roles")
    public ResponseEntity<?> getAllRole() {
        DataResponse dataResponse = new DataResponse();
        List<RoleDTO> roleDTOS = roleService.getALLRole();
        dataResponse.setDesc("get All role");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(roleDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
