package com.backend_spring.controller;

import com.backend_spring.payload.request.SignInRequest;
import com.backend_spring.payload.response.DataResponse;
import com.backend_spring.payload.response.DataTokenResponse;
import com.backend_spring.security.jwt.JwtTokenHelper;
import com.backend_spring.services.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    UserService userService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenHelper jwtTokenHelper;

    Gson gson = new Gson();
    long expiredDate = 1 * 60 * 60 * 1000;
    long refreshExpiredDate = 8 * 60 * 60 * 1000;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInRequest request) {
        DataResponse dataResponse = new DataResponse();
        try{
            UsernamePasswordAuthenticationToken authRequest = new
                    UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
            Authentication authentication = authenticationManager.authenticate(authRequest);
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
            String token = jwtTokenHelper.generateToken(request.getEmail(), "authen",
                    securityContext.getAuthentication().getAuthorities().iterator().next().toString(), expiredDate);
            String refreshToken = jwtTokenHelper.generateToken(request.getEmail(),"refresh",
                    securityContext.getAuthentication().getAuthorities().iterator().next().toString() ,refreshExpiredDate);

            DataTokenResponse dataTokenResponse = new DataTokenResponse();
            dataTokenResponse.setToken(token);
            dataTokenResponse.setFreshToken(refreshToken);
            dataTokenResponse.setRole(securityContext.getAuthentication().getAuthorities().iterator().next().toString());
            dataTokenResponse.setExpire(expiredDate);
            dataResponse.setStatus(HttpStatus.OK.value());
            dataResponse.setDesc("");
            dataResponse.setData(dataTokenResponse);
            dataResponse.setSuccess(true);
            return new ResponseEntity<>(dataResponse , HttpStatus.OK);
        }catch (BadCredentialsException e){
            dataResponse.setStatus(HttpStatus.BAD_REQUEST.value());
            dataResponse.setDesc("Sai tài khoản hoặc mật khẩu");
            return new ResponseEntity<>(dataResponse , HttpStatus.OK);
        }catch (UsernameNotFoundException e){
            dataResponse.setStatus(HttpStatus.BAD_REQUEST.value());
            dataResponse.setDesc("Tài khoản không tồn tại");
            return new ResponseEntity<>(dataResponse , HttpStatus.OK);
        }
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestParam("token") String token){
        DataResponse dataResponse = new DataResponse();
        if(jwtTokenHelper.validateToken(token)){
            String json = jwtTokenHelper.decodeToken(token);
            Map<String, Object> map = gson.fromJson(json, Map.class);

            if(StringUtils.hasText((map.get("type")).toString()) && map.get("type").toString().equals("refresh")){
                String tokenAuthen = jwtTokenHelper.generateToken(map.get("username").toString(), "authen", map.get("role").toString(), expiredDate);
                String tokenRefresh = jwtTokenHelper.generateToken(map.get("username").toString(), "refresh", map.get("role").toString(), refreshExpiredDate);

                DataTokenResponse dataTokenResponse = new DataTokenResponse();
                dataTokenResponse.setToken(tokenAuthen);
                dataTokenResponse.setFreshToken(tokenRefresh);
                dataTokenResponse.setRole(map.get("role").toString());

                dataResponse.setSuccess(true);
                dataResponse.setData(dataTokenResponse);
            }else {
                dataResponse.setSuccess(false);
            }
        }

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
