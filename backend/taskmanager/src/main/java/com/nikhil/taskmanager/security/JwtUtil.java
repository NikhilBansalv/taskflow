package com.nikhil.taskmanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationTime;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {
        return Jwts.builder().setSubject(email).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey()).compact();
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
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }
}
