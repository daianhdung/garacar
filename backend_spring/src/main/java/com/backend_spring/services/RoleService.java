package com.backend_spring.services;

import com.backend_spring.dto.RoleDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RoleService {


    List<RoleDTO> getALLRole();

    RoleDTO getRoleById(int idRole);

    boolean insertRole(RoleDTO roleDTO, MultipartFile file);

    boolean updateRole(int idRole, RoleDTO roleDTO, MultipartFile file);

    boolean deleteRoleById(int idRole);
}
