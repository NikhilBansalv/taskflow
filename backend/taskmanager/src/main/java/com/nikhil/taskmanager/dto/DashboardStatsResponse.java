package com.nikhil.taskmanager.dto;

public class DashboardStatsResponse {

    private long totalProjects;
    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private long highPriorityTasks;

    public DashboardStatsResponse(
            long totalProjects,
            long totalTasks,
            long completedTasks,
            long pendingTasks,
            long highPriorityTasks) {

        this.totalProjects = totalProjects;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
        this.highPriorityTasks = highPriorityTasks;
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
}