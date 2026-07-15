package com.nikhil.taskmanager.service;

import com.nikhil.taskmanager.dto.DashboardStatsResponse;
import com.nikhil.taskmanager.enums.TaskPriority;
import com.nikhil.taskmanager.enums.TaskStatus;
import com.nikhil.taskmanager.repository.ProjectRepository;
import com.nikhil.taskmanager.repository.TaskRepository;
import com.nikhil.taskmanager.repository.UserRepository;
import com.nikhil.taskmanager.model.User;
import com.nikhil.taskmanager.dto.ActiveProjectResponse;
import org.springframework.data.domain.PageRequest;
import java.util.List;
import com.nikhil.taskmanager.dto.UpcomingTaskResponse;

import java.util.Arrays;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.time.LocalDate;

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
                long pendingTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.TO_DO)
                                + taskRepository.countByProject_UserAndStatus(user, TaskStatus.IN_PROGRESS);
                long highPriorityTasks = taskRepository.countByProject_UserAndPriority(user, TaskPriority.HIGH);
                long todoTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.TO_DO);
                long inProgressTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.IN_PROGRESS);
                long doneTasks = taskRepository.countByProject_UserAndStatus(user, TaskStatus.DONE);
                List<ActiveProjectResponse> activeProjects = projectRepository.findByUser(user)
                                .stream()
                                .map(project -> {

                                        LocalDate nextDueDate = taskRepository
                                                        .findNextDueDateByProjectId(project.getId());

                                        long projectPendingTasks = taskRepository.countByProjectAndStatus(
                                                        project,
                                                        TaskStatus.TO_DO)
                                                        +
                                                        taskRepository.countByProjectAndStatus(
                                                                        project,
                                                                        TaskStatus.IN_PROGRESS);

                                        return new ActiveProjectResponse(
                                                        project.getId(),
                                                        project.getName(),
                                                        project.getDescription(),
                                                        nextDueDate,
                                                        projectPendingTasks);
                                })
                                .sorted(
                                                Comparator.comparing(
                                                                ActiveProjectResponse::getNextDueDate,
                                                                Comparator.nullsLast(Comparator.naturalOrder())))
                                .limit(3)
                                .toList();
                List<UpcomingTaskResponse> upcomingTasks = taskRepository
                                .findByProject_UserAndStatusInOrderByDueDateAsc(
                                                user,
                                                Arrays.asList(TaskStatus.TO_DO, TaskStatus.IN_PROGRESS),
                                                PageRequest.of(0, 5))
                                .stream()
                                .map(task -> new UpcomingTaskResponse(
                                                task.getId(),
                                                task.getTitle(),
                                                task.getDueDate(),
                                                task.getPriority(),
                                                task.getProject().getId(),
                                                task.getProject().getName()))
                                .toList();

                return new DashboardStatsResponse(
                                totalProjects,
                                totalTasks,
                                completedTasks,
                                pendingTasks,
                                highPriorityTasks,
                                todoTasks,
                                inProgressTasks,
                                doneTasks,
                                activeProjects,
                                upcomingTasks);
        }
}