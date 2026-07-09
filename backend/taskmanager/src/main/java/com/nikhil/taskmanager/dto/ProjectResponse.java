package com.nikhil.taskmanager.dto;

import java.time.LocalDateTime;

public class ProjectResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private long totalTasks;
    private long completedTasks;

    public ProjectResponse() {
        // default constructor
    }

    public ProjectResponse(Long id, String name, String description, LocalDateTime createdAt, long totalTasks,
            long completedTasks) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }
}
