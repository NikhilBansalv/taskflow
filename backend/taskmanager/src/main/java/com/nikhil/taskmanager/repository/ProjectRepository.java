package com.nikhil.taskmanager.repository;

import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
}