package com.backend_spring.services.imp;

import com.backend_spring.entity.UserEntity;
import com.backend_spring.repository.UserRepository;
import com.backend_spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserEntity checkLogin(String username) {
        List<UserEntity> users = userRepository.getByUserName(username);
        return users.size() > 0 ? users.get(0) : null;
    }
}
