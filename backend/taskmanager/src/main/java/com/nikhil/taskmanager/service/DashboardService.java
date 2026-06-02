package com.nikhil.taskmanager.service;

import com.nikhil.taskmanager.dto.DashboardStatsResponse;
import com.nikhil.taskmanager.enums.TaskPriority;
import com.nikhil.taskmanager.enums.TaskStatus;
import com.nikhil.taskmanager.repository.ProjectRepository;
import com.nikhil.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public DashboardService(ProjectRepository projectRepository,
            TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public DashboardStatsResponse getStats() {

        long totalProjects = projectRepository.count();

        long totalTasks = taskRepository.count();

        long completedTasks = taskRepository.countByStatus(TaskStatus.DONE);

        long pendingTasks = taskRepository.countByStatus(TaskStatus.TO_DO);

        long highPriorityTasks = taskRepository.countByPriority(TaskPriority.HIGH);

        return new DashboardStatsResponse(totalProjects, totalTasks, completedTasks, pendingTasks, highPriorityTasks);
    }
}