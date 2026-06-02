package com.nikhil.taskmanager.dto;

import com.nikhil.taskmanager.enums.TaskStatus;

public class UpdateTaskStatusRequest {
    private TaskStatus status;

    public UpdateTaskStatusRequest() {
        // default constructor
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }
}