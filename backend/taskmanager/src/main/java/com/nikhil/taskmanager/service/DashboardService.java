package com.nikhil.taskmanager.service;

import com.nikhil.taskmanager.dto.DashboardStatsResponse;
import com.nikhil.taskmanager.enums.TaskPriority;
import com.nikhil.taskmanager.enums.TaskStatus;
import com.nikhil.taskmanager.repository.ProjectRepository;
import com.nikhil.taskmanager.repository.TaskRepository;
import com.nikhil.taskmanager.repository.UserRepository;
import com.nikhil.taskmanager.model.User;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public DashboardService(ProjectRepository projectRepository, TaskRepository taskRepository,
            UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public DashboardStatsResponse getStats(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        long totalProjects = projectRepository.countByUser(user);
        long totalTasks = taskRepository.countByProject_User(user);
        long completedTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.DONE);
        long pendingTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.TO_DO);
        long highPriorityTasks = taskRepository.countByProject_UserAndPriority(user, TaskPriority.HIGH);
        long todoTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.TO_DO);
        long inProgressTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.IN_PROGRESS);
        long doneTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.DONE);

        return new DashboardStatsResponse(
                totalProjects,
                totalTasks,
                completedTasks,
                pendingTasks,
                highPriorityTasks,
                todoTasks,
                inProgressTasks,
                doneTasks);
    }
}