package com.nikhil.taskmanager.dto;

import java.time.LocalDate;

public class ActiveProjectResponse {

    private Long id;
    private String name;
    private String description;
    private LocalDate nextDueDate;
    private long pendingTasks;

    public ActiveProjectResponse(
            Long id,
            String name,
            String description,
            LocalDate nextDueDate,
            long pendingTasks) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.nextDueDate = nextDueDate;
        this.pendingTasks = pendingTasks;
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

    public LocalDate getNextDueDate() {
        return nextDueDate;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }
}