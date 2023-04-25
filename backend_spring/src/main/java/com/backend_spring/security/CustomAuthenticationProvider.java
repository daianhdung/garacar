package com.backend_spring.security;

import com.backend_spring.entity.UserEntity;
import com.backend_spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        UserEntity user = userService.checkLogin(username);

        if(user != null){
            boolean isMatchPassword = passwordEncoder.matches(password, user.getPassword());
            if(isMatchPassword){
                return new UsernamePasswordAuthenticationToken(user.getId(), user.getPassword(), AuthorityUtils.createAuthorityList(user.getRole().getName()));
            }else {
                throw new BadCredentialsException("Bad credentials");
            }
        }else {
            throw new UsernameNotFoundException("Username incorrect or not exist");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
