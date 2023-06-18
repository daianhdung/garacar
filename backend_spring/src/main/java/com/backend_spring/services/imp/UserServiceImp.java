package com.backend_spring.services.imp;

import com.backend_spring.dto.ProductDTO;
import com.backend_spring.dto.UserDTO;
import com.backend_spring.entity.ImageProductEntity;
import com.backend_spring.entity.ProductEntity;
import com.backend_spring.entity.UserEntity;
import com.backend_spring.repository.RoleRepository;
import com.backend_spring.repository.UserRepository;
import com.backend_spring.services.UserService;
import com.backend_spring.utils.enumpackage.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

import static com.backend_spring.constant.FieldEntityConstant.ROLE_ANONYMOUS;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public UserEntity checkLogin(String username) {
        List<UserEntity> users = userRepository.getByUserName(username);
        return users.size() > 0 ? users.get(0) : null;
    }

    @Override
    public List<UserDTO> getALLUser() {
        List<UserDTO> list = new ArrayList<>();
        userRepository.findAllByRoleIdIsNot(ROLE_ANONYMOUS).forEach(userEntity -> {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(userEntity.getId());
            userDTO.setFullname(userEntity.getFullName());
//            userDTO.set(Url.ProductsImage.getPath() + userEntity.getMainImage());
            userDTO.setUserName(userEntity.getUserName());
            userDTO.setAddress(userEntity.getAddress());
            userDTO.setRoleName(userEntity.getRole().getDescription());
            userDTO.setEmail(userEntity.getEmail());
            userDTO.setPhone(userEntity.getPhone());
            list.add(userDTO);
        });
        return list;
    }

    @Override
    public UserDTO getUserById(int idUser) {
        Optional<UserEntity> user = userRepository.findById(idUser);
        if (user.isPresent()) {

            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.get().getId());
            userDTO.setFullname(user.get().getFullName());
            userDTO.setPhone(user.get().getPhone());
            userDTO.setEmail(user.get().getEmail());
            userDTO.setAddress(user.get().getAddress());
            userDTO.setUserName(user.get().getUserName());
            userDTO.setRoleId(user.get().getRole().getId());
            userDTO.setRoleName(user.get().getRole().getDescription());

            return userDTO;
        }
        return null;
    }

    @Override
    public boolean insertUser(UserDTO userDTO, MultipartFile file) {
        UserEntity user = new UserEntity();
        user.setFullName(userDTO.getFullname());
        user.setPhone(userDTO.getPhone());
        user.setAddress(userDTO.getAddress());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setUserName(userDTO.getUserName());
        user.setRole(roleRepository.findById(userDTO.getRoleId()).orElse(null));

        try {
            userRepository.save(user);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updateUser(int idUser, UserDTO userDTO, MultipartFile file) {
        Optional<UserEntity> user = userRepository.findById(idUser);
        if(user.isPresent()){
            user.get().setFullName(userDTO.getFullname());
            user.get().setPhone(userDTO.getPhone());
            user.get().setAddress(userDTO.getAddress());
            user.get().setEmail(userDTO.getEmail());
            user.get().setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.get().setUserName(userDTO.getUserName());
            user.get().setRole(roleRepository.findById(userDTO.getRoleId()).orElse(null));
        }

        try {
            userRepository.save(user.get());
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean deleteUserById(int idUser) {
        try {
            userRepository.deleteById(idUser);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
