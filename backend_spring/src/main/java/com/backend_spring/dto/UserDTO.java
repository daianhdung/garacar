package com.backend_spring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private int id;
    private String email;
    private String fullname;

    private String phone;

    private String address;

    private String password;

    private String newPassword;

    private String roleName;

    private int roleId;

}
