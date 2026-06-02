package com.nikhil.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateProjectRequest {
    @NotBlank(message = "Project name cannot be empty")
    private String name;

    private String description;

    public CreateProjectRequest() {
        // default constructor
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
