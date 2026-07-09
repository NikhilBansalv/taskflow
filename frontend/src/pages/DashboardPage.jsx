import { useEffect, useState } from "react";

import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { Box, Grid, Typography, Paper, LinearProgress } from "@mui/material";

const statCards = [
  {
    key: "totalProjects",
    label: "Projects",
    icon: <FolderIcon />,
    cols: 4,
    accent: "#3b82f6",
  },
  {
    key: "totalTasks",
    label: "Tasks",
    icon: <AssignmentIcon />,
    cols: 4,
    accent: "#8b5cf6",
  },
  {
    key: "completedTasks",
    label: "Completed",
    icon: <CheckCircleIcon />,
    cols: 4,
    accent: "#10b981",
  },
  {
    key: "pendingTasks",
    label: "Pending",
    icon: <PendingActionsIcon />,
    cols: 6,
    accent: "#f59e0b",
  },
  {
    key: "highPriorityTasks",
    label: "High Priority",
    icon: <PriorityHighIcon />,
    cols: 6,
    accent: "#ef4444",
  },
];

const styles = {
  loadingWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: "rgba(255,255,255,0.4)",
    gap: 10,
  },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid rgba(59,130,246,0.2)",
    borderTop: "2px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  heroBanner: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.09)",
    borderRadius: 16,
    padding: "28px 32px",
    marginBottom: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    position: "relative",
    overflow: "hidden",
  },
  heroBlueLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background: "linear-gradient(180deg, #3b82f6, #8b5cf6)",
    borderRadius: "16px 0 0 16px",
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 24,
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 6px",
    letterSpacing: "-0.3px",
  },
  heroSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    margin: 0,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
  },
  heroBadge: {
    background: "rgba(59,130,246,0.12)",
    border: "0.5px solid rgba(59,130,246,0.25)",
    borderRadius: 999,
    padding: "6px 16px",
    fontSize: 12,
    color: "#93b4ff",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 16,
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "22px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "border-color 0.2s, background 0.2s",
    cursor: "default",
    position: "relative",
    overflow: "hidden",
  },
  cardTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
  },
  cardIcon: {
    fontSize: 16,
    opacity: 0.7,
  },
  cardValue: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 36,
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1,
    margin: 0,
  },
  cardAccentBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: "0 0 14px 14px",
  },
};

function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/api/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <DashboardLayout>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={styles.loadingWrap}>
          <div style={styles.spinner} />
          Loading dashboard…
        </div>
      </DashboardLayout>
    );
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const completionRate =
    stats.totalTasks === 0
      ? 0
      : Math.round((stats.completedTasks / stats.totalTasks) * 100);

  return (
    <DashboardLayout>
      {/* Hero banner */}
      <div style={styles.heroBanner}>
        <div style={styles.heroBlueLine} />
        <div style={{ paddingLeft: 12 }}>
          <h2 style={styles.heroTitle}>Welcome back 👋</h2>
          <p style={styles.heroSub}>
            Here's what's happening across your projects today.
          </p>
        </div>
        <span style={styles.heroBadge}>{today}</span>
      </div>

      {/* Stat cards grid */}
      <Grid container spacing={3}>
        {statCards.map(({ key, label, icon, accent, cols }) => (
          <Grid
            key={key}
            size={{
              xs: 12,
              md: cols === 4 ? 4 : 6,
            }}
          >
            <StatCard
              title={label}
              value={stats[key]}
              icon={icon}
              color={accent}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          mt: 4,
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            mb: 3,
          }}
        >
          📈 Analytics
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: "#94a3b8",
            }}
          >
            Task Completion
          </Typography>

          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            {completionRate}%
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={completionRate}
          sx={{
            height: 10,
            borderRadius: 10,
            backgroundColor: "#1f2937",

            "& .MuiLinearProgress-bar": {
              background:
                completionRate === 100
                  ? "#22c55e"
                  : completionRate >= 50
                    ? "#f59e0b"
                    : "#3b82f6",
            },
          }}
        />

        <Typography
          sx={{
            mt: 2,
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          {stats.completedTasks} of {stats.totalTasks} tasks completed
        </Typography>
      </Box>
    </DashboardLayout>
  );
}

export default DashboardPage;
