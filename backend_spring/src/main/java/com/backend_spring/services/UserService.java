package com.backend_spring.services;

import com.backend_spring.dto.UserDTO;
import com.backend_spring.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    UserEntity checkLogin(String fullname);

    List<UserDTO> getALLUser();

    UserDTO getUserById(int idUser);

    boolean insertUser(UserDTO userDTO, MultipartFile file);

    boolean updateUser(int idUser, UserDTO userDTO, MultipartFile file);

    boolean deleteUserById(int idUser);
}
