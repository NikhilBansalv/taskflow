package com.nikhil.taskmanager.repository;

import com.nikhil.taskmanager.enums.TaskPriority;
import com.nikhil.taskmanager.enums.TaskStatus;
import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);

    long countByStatus(TaskStatus status);

    long countByPriority(TaskPriority priority);
}