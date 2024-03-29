package com.backend_spring.repository;

import com.backend_spring.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    List<UserEntity> getByUserName(String username);

    UserEntity findUserEntityByEmail(String email);

    List<UserEntity> findAllByRoleIdIsNot(int roleId);
}
