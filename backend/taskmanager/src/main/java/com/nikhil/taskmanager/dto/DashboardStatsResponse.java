package com.nikhil.taskmanager.dto;

public class DashboardStatsResponse {

    private long totalProjects;
    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private long highPriorityTasks;
    private long todoTasks;
    private long inProgressTasks;
    private long doneTasks;

    public DashboardStatsResponse(
            long totalProjects,
            long totalTasks,
            long completedTasks,
            long pendingTasks,
            long highPriorityTasks,
            long todoTasks,
            long inProgressTasks,
            long doneTasks) {

        this.totalProjects = totalProjects;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
        this.highPriorityTasks = highPriorityTasks;
        this.todoTasks = todoTasks;
        this.inProgressTasks = inProgressTasks;
        this.doneTasks = doneTasks;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public long getHighPriorityTasks() {
        return highPriorityTasks;
    }

    public long getTodoTasks() {
        return todoTasks;
    }

    public long getInProgressTasks() {
        return inProgressTasks;
    }

    public long getDoneTasks() {
        return doneTasks;
    }
}