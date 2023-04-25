package com.backend_spring.security.jwt;

import com.google.gson.Gson;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenHelper {

    private final String strKey = "xJHDonkgbMOgIGNodeG7l2kgYuG6o28gbeG6rXQgxJHhuqd5IMSR4bunIDI1NiBiaXQ=";
    private Gson gson = new Gson();
    public String generateToken(String data, String type, String role, long expiredDate) {
        Date now = new Date();
        Date dateExpired = new Date(now.getTime() + expiredDate);
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(strKey));

        Map<String, Object> map = new HashMap<>();
        map.put("username", data);
        map.put("type", type);
        map.put("role", role);
        String json = gson.toJson(map);

        return Jwts.builder()
                .setSubject(json) // lữu trữ dữ liệu vào trong token kiểu String
                .setIssuedAt(now) // thời gian tạo ra token
                .setExpiration(dateExpired) // thời gian hết hạn token
                .signWith(secretKey, SignatureAlgorithm.HS256) // thuật toán mã hóa và secret Key
                .compact(); // trả về token đã được mã hóa
    }
    public String generateToken(String data, long expiredDate) {
        Date now = new Date();
        Date dateExpired = new Date(now.getTime() + expiredDate);
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(strKey));

        return Jwts.builder()
                .setSubject(data) // lữu trữ dữ liệu vào trong token kiểu String
                .setIssuedAt(now) // thời gian tạo ra token
                .setExpiration(dateExpired) // thời gian hết hạn token
                .signWith(secretKey, SignatureAlgorithm.HS256) // thuật toán mã hóa và secret Key
                .compact(); // trả về token đã được mã hóa
    }

    public String generateToken(String data) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(strKey));

        return Jwts.builder()
                .setSubject(data) // lữu trữ dữ liệu vào trong token kiểu String
                .signWith(secretKey, SignatureAlgorithm.HS256) // thuật toán mã hóa và secret Key
                .compact(); // trả về token đã được mã hóa
    }

    public String decodeToken(String token) {

        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(strKey));
        return Jwts.parserBuilder()
                .setSigningKey(secretKey).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    public boolean validateToken(String token) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(strKey));
        boolean isSuccess = false;
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            isSuccess = true;
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty.");
        }
        return isSuccess;
    }
}
