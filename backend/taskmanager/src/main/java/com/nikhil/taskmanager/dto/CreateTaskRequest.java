package com.nikhil.taskmanager.dto;

import com.nikhil.taskmanager.enums.TaskPriority;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class CreateTaskRequest {
    @NotBlank(message = "Task title cannot be empty")
    private String title;

    private String description;

    private TaskPriority priority;

    private LocalDate dueDate;

    public CreateTaskRequest() {
        // default constructor
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
}