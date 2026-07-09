package com.nikhil.taskmanager.controller;

import com.nikhil.taskmanager.dto.CreateProjectRequest;
import com.nikhil.taskmanager.dto.ProjectResponse;
import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.User;
import com.nikhil.taskmanager.repository.UserRepository;
import com.nikhil.taskmanager.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.nikhil.taskmanager.repository.TaskRepository;
import com.nikhil.taskmanager.enums.TaskStatus;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public ProjectController(ProjectService projectService, UserRepository userRepository,
            TaskRepository taskRepository) {
        this.projectService = projectService;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    @PostMapping
    public ProjectResponse createProject(Authentication authentication,
            @Valid @RequestBody CreateProjectRequest request) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Project project = new Project(request.getName(), request.getDescription(), user);

        Project savedProject = projectService.createProject(project);

        return new ProjectResponse(
                savedProject.getId(),
                savedProject.getName(),
                savedProject.getDescription(),
                savedProject.getCreatedAt(),
                taskRepository.countByProject(project),
                taskRepository.countByProjectAndStatus(project, TaskStatus.DONE));
    }

    @GetMapping
    public List<ProjectResponse> getProjects(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Project> projects = projectService.getProjectsByUser(user);

        return projects.stream()
                .map(project -> new ProjectResponse(
                        project.getId(),
                        project.getName(),
                        project.getDescription(),
                        project.getCreatedAt(),
                        taskRepository.countByProject(project),
                        taskRepository.countByProjectAndStatus(project, TaskStatus.DONE)))
                .toList();
    }

    @GetMapping("/{id}")
    public ProjectResponse getProjectById(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Project project = projectService.getProjectById(id, user);
        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getCreatedAt(),
                taskRepository.countByProject(project),
                taskRepository.countByProjectAndStatus(project, TaskStatus.DONE));
    }

    @PutMapping("/{id}")
    public ProjectResponse updateProject(@PathVariable Long id, Authentication authentication,
            @Valid @RequestBody CreateProjectRequest request) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Project updatedProject = projectService.updateProject(id, request.getName(), request.getDescription(), user);

        return new ProjectResponse(
                updatedProject.getId(),
                updatedProject.getName(),
                updatedProject.getDescription(),
                updatedProject.getCreatedAt(),
                taskRepository.countByProject(updatedProject),
                taskRepository.countByProjectAndStatus(updatedProject, TaskStatus.DONE));
    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        projectService.deleteProject(id, user);
        return "Project deleted successfully";
    }
}