package com.nikhil.taskmanager.dto;

import com.nikhil.taskmanager.enums.TaskPriority;
import java.time.LocalDate;

public class UpcomingTaskResponse {

    private Long id;
    private String title;
    private LocalDate dueDate;
    private TaskPriority priority;
    private Long projectId;
    private String projectName;

    public UpcomingTaskResponse(
            Long id,
            String title,
            LocalDate dueDate,
            TaskPriority priority,
            Long projectId,
            String projectName) {

        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.projectName = projectName;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public Long getProjectId() {
        return projectId;
    }

    public String getProjectName() {
        return projectName;
    }
}