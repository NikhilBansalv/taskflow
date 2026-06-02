package com.nikhil.taskmanager.service;

import com.nikhil.taskmanager.model.Project;
import com.nikhil.taskmanager.model.Task;
import com.nikhil.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;
import com.nikhil.taskmanager.enums.TaskPriority;
import com.nikhil.taskmanager.enums.TaskStatus;
import java.time.LocalDate;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getTasksByProject(Project project) {
        return taskRepository.findByProject(project);
    }

    public Task updateTask(Long taskId, String title, String description, TaskPriority priority, LocalDate dueDate) {
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task == null) {
            throw new RuntimeException("Task not found");
        }

        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setDueDate(dueDate);
        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task == null) {
            throw new RuntimeException("Task not found");
        }

        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElse(null);

        if (task == null) {
            throw new RuntimeException("Task not found");
        }
        taskRepository.delete(task);
    }
}