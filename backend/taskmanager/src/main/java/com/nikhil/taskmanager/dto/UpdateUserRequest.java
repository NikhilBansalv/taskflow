package com.nikhil.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateUserRequest {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    public UpdateUserRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}