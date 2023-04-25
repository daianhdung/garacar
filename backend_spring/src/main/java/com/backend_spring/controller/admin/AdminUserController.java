package com.backend_spring.controller.admin;

import com.backend_spring.dto.UserDTO;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.services.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminUserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUser() {
        DataResponse dataResponse = new DataResponse();
        List<UserDTO> userDTOS = userService.getALLUser();
        dataResponse.setDesc("get All user");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(userDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> geUserById(@PathVariable("id") int idUser) {
        DataResponse dataResponse = new DataResponse();
        UserDTO userDTO = userService.getUserById(idUser);
        dataResponse.setDesc("get All user");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(userDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<?> insertUser(@RequestParam("userDTO") String userDTO,
                                           @RequestParam(value = "mainImage", required = false) MultipartFile file){
        Gson gson = new Gson();
        UserDTO userDTOParser = gson.fromJson(userDTO,UserDTO.class);
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = userService.insertUser(userDTOParser, file);
        dataResponse.setSuccess(isSuccess);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable("id") int idUser, @RequestParam(name = "userDTO") String userDTO,
                                               @RequestParam(value = "mainImage", required = false) MultipartFile file ){
        DataResponse dataResponse = new DataResponse();
        Gson gson = new Gson();
        UserDTO userDTOParser = gson.fromJson(userDTO,UserDTO.class);
        boolean isSuccess = userService.updateUser(idUser, userDTOParser, file);
        dataResponse.setDesc("Update user");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @DeleteMapping ("/user/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") int idUser) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = userService.deleteUserById(idUser);
        dataResponse.setDesc("Delete user");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
