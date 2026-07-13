import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import SnackbarAlert from "../components/SnackbarAlert";

function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTasks = async () => {
    try {
      const response = await api.get(`/api/tasks/project/${id}`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createTask = async () => {
    try {
      await api.post(`/api/tasks?projectId=${id}`, {
        title,
        description,
        priority,
        dueDate,
      });
      showSnackbar("Task created successfully!", "success");
      setOpenDialog(false);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to create task.", "error");
    }
  };
  const updateTask = async () => {
    try {
      await api.put(`/api/tasks/${editingTask.id}`, {
        title,
        description,
        priority,
        dueDate,
      });
      showSnackbar("Task updated successfully!", "success");
      fetchTasks();
      setOpenDialog(false);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      setIsEditing(false);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to update task.", "error");
    }
  };
  const updateTaskStatus = async (taskId, status) => {
    try {
      await api.patch(`/api/tasks/${taskId}/status`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTask = async () => {
    try {
      await api.delete(`/api/tasks/${taskToDelete.id}`);
      showSnackbar("Task deleted successfully!", "success");
      fetchTasks();
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to delete task.", "error");
    }
  };
  const openEditDialog = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setIsEditing(true);
    setOpenDialog(true);
  };
  const openDeleteDialog = (task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return {
          backgroundColor: "#ef4444",
          color: "white",
        };

      case "MEDIUM":
        return {
          backgroundColor: "#f59e0b",
          color: "white",
        };

      case "LOW":
        return {
          backgroundColor: "#22c55e",
          color: "white",
        };

      default:
        return {};
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "TO_DO":
        return {
          backgroundColor: "#6b7280",
          color: "white",
        };

      case "IN_PROGRESS":
        return {
          backgroundColor: "#3b82f6",
          color: "white",
        };

      case "DONE":
        return {
          backgroundColor: "#22c55e",
          color: "white",
        };

      default:
        return {};
    }
  };
  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  if (!project) {
    return (
      <DashboardLayout>
        <Typography color="white">Loading project...</Typography>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/projects")}
        sx={{
          mb: 3,
          textTransform: "none",
        }}
      >
        Back to Projects
      </Button>

      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: 700,
          mb: 1,
        }}
      >
        📁 {project.name}
      </Typography>

      <Typography
        sx={{
          color: "#94a3b8",
          mb: 4,
        }}
      >
        {project.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            color: "#94a3b8",
            fontWeight: 500,
          }}
        >
          {filteredTasks.length} {filteredTasks.length === 1 ? "Task" : "Tasks"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            size="small"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 280,

              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                color: "white",

                "& fieldset": {
                  borderColor: "#374151",
                },

                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
              },

              "& input::placeholder": {
                color: "#94a3b8",
                opacity: 1,
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            New Task
          </Button>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEditing ? "Update Task" : "Create New Task"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Task Title"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            select
            fullWidth
            label="Priority"
            margin="normal"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="date"
            margin="normal"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setTitle("");
              setDescription("");
              setPriority("MEDIUM");
              setDueDate("");
              setIsEditing(false);
              setEditingTask(null);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={isEditing ? updateTask : createTask}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Task</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{taskToDelete?.title}</strong>?
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#ef4444",
              fontWeight: 500,
            }}
          >
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setTaskToDelete(null);
            }}
          >
            Cancel
          </Button>

          <Button color="error" variant="contained" onClick={deleteTask}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {filteredTasks.length === 0 ? (
        <Box
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          <Typography
            sx={{
              fontSize: "70px",
            }}
          >
            📝
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "white",
              mt: 2,
              fontWeight: 600,
            }}
          >
            No Tasks Yet
          </Typography>

          <Typography
            sx={{
              mt: 1,
              mb: 4,
            }}
          >
            Create your first task to get started!
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            New Task
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid key={task.id} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  width: "75%",
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: 3,
                  minHeight: 240,
                  transition: ".25s",

                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "#3b82f6",
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    {task.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#9ca3af",
                      textAlign: "center",
                      lineHeight: 1.7,
                      minHeight: 70,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 1,
                      mb: 3,
                    }}
                  >
                    {task.description}
                  </Typography>

                  <Box sx={{ mt: "auto", width: "100%" }}>
                    <Stack direction="row" spacing={1} mb={2}>
                      <Chip
                        label={task.priority.replace("_", " ")}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          ...getPriorityColor(task.priority),
                        }}
                      />

                      <FormControl size="small">
                        <Select
                          value={task.status}
                          onChange={(e) =>
                            updateTaskStatus(task.id, e.target.value)
                          }
                          sx={{
                            width: 135,
                            height: 25,
                            borderRadius: "8px",
                            fontWeight: 400,
                            fontSize: "0.75rem",
                            ...getStatusColor(task.status),

                            "& .MuiSelect-icon": {
                              color: "white",
                            },
                          }}
                        >
                          <MenuItem value="TO_DO">TO DO</MenuItem>
                          <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
                          <MenuItem value="DONE">DONE</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#94a3b8",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        📅{" "}
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Typography>

                      <Box sx={{ justifySelf: "end" }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => openEditDialog(task)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => openDeleteDialog(task)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </DashboardLayout>
  );
}

export default ProjectDetailsPage;
