package com.nikhil.taskmanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET = "mySuperSecretKeyForJwtAuthentication123456789";
    private final SecretKey secretKey = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    private static final long EXPIRATION_TIME = 1000L * 60 * 60 * 24; // 24 hrs

    public String generateToken(String email) {
        return Jwts.builder().setSubject(email).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey).compact();
    }

    public String extractEmail(String token) {// to extract email(subject) from token
        return extractClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token) {// to check if the token is expired or not
        return extractClaims(token).getExpiration().before(new Date());
    }

    public boolean validateToken(String token, String email) {// validate token for a given email
        return extractEmail(token).equals(email) && !isTokenExpired(token);
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }
}
