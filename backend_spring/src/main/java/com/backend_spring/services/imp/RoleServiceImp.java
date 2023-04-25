package com.backend_spring.services.imp;

import com.backend_spring.dto.RoleDTO;
import com.backend_spring.repository.RoleRepository;
import com.backend_spring.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImp implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<RoleDTO> getALLRole() {
        List<RoleDTO> list = new ArrayList<>();
        roleRepository.findAll().forEach(roleEntity -> {
            RoleDTO roleDTO = new RoleDTO();
            roleDTO.setId(roleEntity.getId());
            roleDTO.setName(roleEntity.getName());
            roleDTO.setDescription(roleEntity.getDescription());
            list.add(roleDTO);
        });
        return list;
    }

    @Override
    public RoleDTO getRoleById(int idRole) {
        return null;
    }

    @Override
    public boolean insertRole(RoleDTO roleDTO, MultipartFile file) {
        return false;
    }

    @Override
    public boolean updateRole(int idRole, RoleDTO roleDTO, MultipartFile file) {
        return false;
    }

    @Override
    public boolean deleteRoleById(int idRole) {
        return false;
    }
}
