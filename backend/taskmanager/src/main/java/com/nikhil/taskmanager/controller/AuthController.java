package com.nikhil.taskmanager.controller;

import com.nikhil.taskmanager.dto.RegisterRequest;
import com.nikhil.taskmanager.dto.UserResponse;
import com.nikhil.taskmanager.model.User;
import com.nikhil.taskmanager.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.nikhil.taskmanager.dto.LoginRequest;
import com.nikhil.taskmanager.dto.LoginResponse;

@RestController // makes the class as rest api controller and return json be default.
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
        User user = new User(request.getName(), request.getEmail(), request.getPassword());
        User savedUser = userService.registerUser(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getCreatedAt());
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        String token = userService.loginUser(
                request.getEmail(),
                request.getPassword());

        return new LoginResponse(token);
    }
}