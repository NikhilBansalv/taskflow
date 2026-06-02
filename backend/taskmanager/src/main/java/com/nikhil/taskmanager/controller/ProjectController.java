package com.nikhil.taskmanager.controller;

import com.nikhil.taskmanager.dto.CreateProjectRequest;
import com.nikhil.taskmanager.dto.ProjectResponse;
import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.User;
import com.nikhil.taskmanager.repository.UserRepository;
import com.nikhil.taskmanager.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;

    public ProjectController(ProjectService projectService, UserRepository userRepository) {
        this.projectService = projectService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ProjectResponse createProject(@RequestParam String email, @Valid @RequestBody CreateProjectRequest request) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Project project = new Project(request.getName(), request.getDescription(), user);

        Project savedProject = projectService.createProject(project);

        return new ProjectResponse(
                savedProject.getId(),
                savedProject.getName(),
                savedProject.getDescription(),
                savedProject.getCreatedAt());
    }

    @GetMapping
    public List<ProjectResponse> getProjects(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        List<Project> projects = projectService.getProjectsByUser(user);
        return projects.stream()
                .map(project -> new ProjectResponse(
                        project.getId(),
                        project.getName(),
                        project.getDescription(),
                        project.getCreatedAt()))
                .toList();
    }

    @PutMapping("/{id}")
    public ProjectResponse updateProject(@PathVariable Long id, @RequestParam String email,
            @Valid @RequestBody CreateProjectRequest request) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Project updatedProject = projectService.updateProject(id, request.getName(), request.getDescription(), user);
        return new ProjectResponse(
                updatedProject.getId(),
                updatedProject.getName(),
                updatedProject.getDescription(),
                updatedProject.getCreatedAt());
    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id, @RequestParam String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        projectService.deleteProject(id, user);
        return "Project deleted successfully";
    }
}