import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import FolderIcon from "@mui/icons-material/Folder";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Box,
  Grid,
  Typography,
  Paper,
  LinearProgress,
  Chip,
} from "@mui/material";

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
  const activeProjects = stats?.activeProjects || [];
  const upcomingTasks = stats?.upcomingTasks || [];
  const navigate = useNavigate();

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
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

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
  const completionRate =
    stats.totalTasks === 0
      ? 0
      : Math.round((stats.completedTasks / stats.totalTasks) * 100);
  const chartData = [
    {
      id: 0,
      value: stats.doneTasks,
      label: "Done",
      color: "#22c55e",
    },
    {
      id: 1,
      value: stats.inProgressTasks,
      label: "In Progress",
      color: "#3b82f6",
    },
    {
      id: 2,
      value: stats.todoTasks,
      label: "To Do",
      color: "#94a3b8",
    },
  ];
  const getDueLabel = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diff < 0)
      return {
        label: "Overdue",
        color: "#ef4444",
      };

    if (diff === 0)
      return {
        label: "Today",
        color: "#f97316",
      };

    if (diff === 1)
      return {
        label: "Tomorrow",
        color: "#facc15",
      };

    return {
      label: due.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      color: "#94a3b8",
    };
  };

  return (
    <DashboardLayout>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: "linear-gradient(145deg,#111827,#0f172a)",
          border: "1px solid rgba(255,255,255,.08)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 1,
            }}
          >
            Welcome Back 👋
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: { xs: "1.7rem", sm: "2.125rem" },
            }}
          >
            Here's what's happening across your projects today.
          </Typography>
        </Box>

        <Chip
          label={today}
          sx={{
            bgcolor: "#1e40af",
            color: "#fff",
            fontWeight: 600,
            px: 1,
            alignSelf: { xs: "flex-start", sm: "center" },
          }}
        />
      </Paper>

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
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(145deg,#111827,#0f172a)",
              border: "1px solid rgba(255,255,255,.08)",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 700,
                mb: 3,
              }}
            >
              📊 Task Distribution
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <PieChart
                series={[
                  {
                    data: chartData,
                    innerRadius: 55,
                    outerRadius: 90,
                    paddingAngle: 3,
                    cornerRadius: 5,
                  },
                ]}
                hideLegend
                width={220}
                height={220}
              />

              <Box
                sx={{
                  flex: 1,
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                {[
                  { label: "Done", value: stats.doneTasks, color: "#22c55e" },
                  {
                    label: "In Progress",
                    value: stats.inProgressTasks,
                    color: "#3b82f6",
                  },
                  { label: "To Do", value: stats.todoTasks, color: "#94a3b8" },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: item.color,
                        }}
                      />

                      <Typography sx={{ color: "#fff" }}>
                        {item.label}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: "#94a3b8",
                        fontWeight: 600,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(145deg,#111827,#0f172a)",
              border: "1px solid rgba(255,255,255,.08)",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 700,
                mb: 3,
              }}
            >
              📈 Productivity
            </Typography>

            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {completionRate}%
            </Typography>

            <LinearProgress
              variant="determinate"
              value={completionRate}
              sx={{
                mt: 3,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#1f2937",

                "& .MuiLinearProgress-bar": {
                  backgroundColor:
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
                mt: 3,
                color: "#94a3b8",
              }}
            >
              {stats.completedTasks} of {stats.totalTasks} tasks completed
            </Typography>
          </Paper>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ mt: { xs: 2, md: 4 }, width: "100%" }}
        >
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 4,
                background: "linear-gradient(145deg,#111827,#0f172a)",
                border: "1px solid rgba(255,255,255,.08)",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                🔥 Active Projects
              </Typography>
              <Box>
                {activeProjects.length === 0 ? (
                  <Typography
                    sx={{
                      color: "#94a3b8",
                      textAlign: "center",
                      py: 3,
                    }}
                  >
                    No recent projects found.
                  </Typography>
                ) : (
                  activeProjects.map((project) => (
                    <Paper
                      onClick={() => navigate(`/projects/${project.id}`)}
                      key={project.id}
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,.06)",
                        transition: "0.25s",

                        "&:hover": {
                          transform: "translateY(-3px)",
                          borderColor: "#3b82f6",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <FolderRoundedIcon
                            sx={{
                              color: "#3b82f6",
                              fontSize: 20,
                            }}
                          />

                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: "#fff",
                              fontWeight: 600,
                            }}
                          >
                            {project.name}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        <Typography
                          sx={{
                            color: "#94a3b8",
                            fontSize: 14,
                          }}
                        >
                          {project.pendingTasks} Pending Tasks
                        </Typography>

                        <Typography
                          sx={{
                            color:
                              project.pendingTasks === 0
                                ? "#22c55e"
                                : "#3b82f6",
                            mt: 0.5,
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {project.nextDueDate
                            ? `Next Due • ${new Date(
                                project.nextDueDate,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}`
                            : "✓ Completed"}
                        </Typography>
                      </Box>
                    </Paper>
                  ))
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 4,
                background: "linear-gradient(145deg,#111827,#0f172a)",
                border: "1px solid rgba(255,255,255,.08)",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                📋 Upcoming Tasks
              </Typography>
              <Box>
                {upcomingTasks.length === 0 ? (
                  <Typography
                    sx={{
                      color: "#94a3b8",
                      textAlign: "center",
                      py: 3,
                    }}
                  >
                    No upcoming tasks 🎉
                  </Typography>
                ) : (
                  upcomingTasks.map((task) => {
                    const dueInfo = getDueLabel(task.dueDate);

                    return (
                      <Paper
                        key={task.id}
                        elevation={0}
                        onClick={() => navigate(`/projects/${task.projectId}`)}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 3,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,.06)",
                          transition: ".25s",

                          "&:hover": {
                            transform: "translateY(-3px)",
                            borderColor: "#3b82f6",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        >
                          {task.title}
                        </Typography>

                        <Typography
                          sx={{
                            color: "#94a3b8",
                            mt: 0.5,
                            fontSize: "14px",
                          }}
                        >
                          {task.projectName}
                        </Typography>

                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Chip
                            label={task.priority}
                            size="small"
                            color={
                              task.priority === "HIGH"
                                ? "error"
                                : task.priority === "MEDIUM"
                                  ? "warning"
                                  : "success"
                            }
                          />

                          <Typography
                            sx={{
                              color: dueInfo.color,
                              fontWeight: 600,
                              fontSize: "12px",
                            }}
                          >
                            {dueInfo.label}
                          </Typography>
                        </Box>
                      </Paper>
                    );
                  })
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default DashboardPage;
