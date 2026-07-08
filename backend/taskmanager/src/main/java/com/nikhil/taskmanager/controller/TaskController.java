package com.nikhil.taskmanager.controller;

import com.nikhil.taskmanager.dto.CreateTaskRequest;
import com.nikhil.taskmanager.dto.TaskResponse;
import com.nikhil.taskmanager.dto.UpdateTaskStatusRequest;
import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.Task;
import com.nikhil.taskmanager.repository.ProjectRepository;
import com.nikhil.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.nikhil.taskmanager.model.User;
import com.nikhil.taskmanager.repository.UserRepository;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public TaskController(TaskService taskService, ProjectRepository projectRepository, UserRepository userRepository) {
        this.taskService = taskService;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public TaskResponse createTask(Authentication authentication, @RequestParam Long projectId,
            @Valid @RequestBody CreateTaskRequest request) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Project project = projectRepository.findByIdAndUser(projectId, user)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Task task = new Task(request.getTitle(), request.getDescription(), request.getPriority(), request.getDueDate(),
                project);

        Task savedTask = taskService.createTask(task);

        return new TaskResponse(savedTask.getId(), savedTask.getTitle(), savedTask.getDescription(),
                savedTask.getStatus(), savedTask.getPriority(), savedTask.getDueDate(), savedTask.getCreatedAt());
    }

    @GetMapping("/project/{projectId}")
    public List<TaskResponse> getTasksByProject(Authentication authentication, @PathVariable Long projectId) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Project project = projectRepository.findByIdAndUser(projectId, user)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        List<Task> tasks = taskService.getTasksByProject(project);

        return tasks.stream().map(task -> new TaskResponse(task.getId(), task.getTitle(), task.getDescription(),
                task.getStatus(), task.getPriority(), task.getDueDate(), task.getCreatedAt())).toList();
    }

    @PutMapping("/{id}")
    public TaskResponse updateTask(@PathVariable Long id, @Valid @RequestBody CreateTaskRequest request) {
        Task updatedTask = taskService.updateTask(id, request.getTitle(), request.getDescription(),
                request.getPriority(), request.getDueDate());

        return new TaskResponse(updatedTask.getId(), updatedTask.getTitle(), updatedTask.getDescription(),
                updatedTask.getStatus(), updatedTask.getPriority(), updatedTask.getDueDate(),
                updatedTask.getCreatedAt());
    }

    @PatchMapping("/{id}/status")
    public TaskResponse updateTaskStatus(@PathVariable Long id, @RequestBody UpdateTaskStatusRequest request) {
        Task updatedTask = taskService.updateTaskStatus(id, request.getStatus());
        return new TaskResponse(updatedTask.getId(), updatedTask.getTitle(), updatedTask.getDescription(),
                updatedTask.getStatus(), updatedTask.getPriority(), updatedTask.getDueDate(),
                updatedTask.getCreatedAt());
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task deleted successfully";
    }
}