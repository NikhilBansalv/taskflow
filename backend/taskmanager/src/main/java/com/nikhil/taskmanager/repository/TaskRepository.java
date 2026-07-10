package com.nikhil.taskmanager.repository;

import com.nikhil.taskmanager.enums.TaskPriority;
import com.nikhil.taskmanager.enums.TaskStatus;
import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nikhil.taskmanager.model.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);

    long countByStatus(TaskStatus status);

    long countByPriority(TaskPriority priority);

    long countByProject_User(User user);

    long countByProject_UserAndStatus(User user, TaskStatus status);

    long countByProject_UserAndPriority(User user, TaskPriority priority);

    long countByProject(Project project);

    long countByProjectAndStatus(Project project, TaskStatus status);

    Optional<Task> findByIdAndProject_User(Long id, User user);

    List<Task> findByProject_UserAndStatusInOrderByDueDateAsc(
            User user,
            List<TaskStatus> statuses,
            Pageable pageable);

    @Query("""
                SELECT MIN(t.dueDate)
                FROM Task t
                WHERE t.project.id = :projectId
                  AND t.status IN ('TO_DO', 'IN_PROGRESS')
            """)
    LocalDate findNextDueDateByProjectId(Long projectId);
}