package com.nikhil.taskmanager.repository;

import com.nikhil.taskmanager.enums.TaskPriority;
import com.nikhil.taskmanager.enums.TaskStatus;
import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nikhil.taskmanager.model.User;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);

    long countByStatus(TaskStatus status);

    long countByPriority(TaskPriority priority);

    long countByProject_User(User user);

    long countByProject_UserAndStatus(User user, TaskStatus status);

    long countByProject_UserAndPriority(User user, TaskPriority priority);

    Optional<Task> findByIdAndProject_User(Long id, User user);
}