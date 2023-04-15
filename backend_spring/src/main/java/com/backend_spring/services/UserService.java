package com.backend_spring.services;

import com.backend_spring.entity.UserEntity;

public interface UserService {

    UserEntity checkLogin(String fullname);
}
