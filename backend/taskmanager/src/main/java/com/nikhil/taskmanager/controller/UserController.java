package com.nikhil.taskmanager.controller;

import com.nikhil.taskmanager.dto.UserResponse;
import com.nikhil.taskmanager.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.nikhil.taskmanager.dto.UpdateUserRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser(Authentication authentication) {
        return userService.getUserProfile(authentication.getName());
    }

    @PutMapping("/me")
    public UserResponse updateCurrentUser(
            Authentication authentication,
            @Valid @RequestBody UpdateUserRequest request) {

        return userService.updateUserProfile(
                authentication.getName(),
                request);
    }

}