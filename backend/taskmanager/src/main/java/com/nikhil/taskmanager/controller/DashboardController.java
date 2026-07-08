package com.nikhil.taskmanager.controller;

import com.nikhil.taskmanager.dto.DashboardStatsResponse;
import com.nikhil.taskmanager.service.DashboardService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStatsResponse getStats(Authentication authentication) {

        return dashboardService.getStats(authentication.getName());

    }
}