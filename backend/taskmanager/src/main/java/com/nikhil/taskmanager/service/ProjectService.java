package com.nikhil.taskmanager.service;

import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.User;
import com.nikhil.taskmanager.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getProjectsByUser(User user) {
        return projectRepository.findByUser(user);
    }

    public Project updateProject(Long projectId, String name, String description, User user) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            throw new RuntimeException("Project not found");
        }

        if (project.getUser().getId() != user.getId()) {
            throw new RuntimeException("You are not allowed to update this project");
        }

        project.setName(name);
        project.setDescription(description);

        return projectRepository.save(project);
    }

    public void deleteProject(Long projectId, User user) {
        Project project = projectRepository.findById(projectId).orElse(null);

        if (project == null) {
            throw new RuntimeException("Project not found");
        }

        if (project.getUser().getId() != user.getId()) {
            throw new RuntimeException("You are not allowed to delete this project");
        }

        projectRepository.delete(project);
    }
}
