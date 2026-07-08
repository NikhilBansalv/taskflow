import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createProject = async () => {
    try {
      await api.post("/api/projects", {
        name,
        description,
      });
      setShowForm(false);
      setName("");
      setDescription("");
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };
  const openEditDialog = (project) => {
    setEditingProject(project);
    setName(project.name);
    setDescription(project.description);
    setIsEditing(true);
    setShowForm(true);
  };
  const updateProject = async () => {
    await api.put(
      `/api/projects/${editingProject.id}`,

      {
        name,
        description,
      },
    );
    fetchProjects();
    setShowForm(false);
    setIsEditing(false);
    setEditingProject(null);
    setName("");
    setDescription("");
  };
  const openDeleteDialog = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };
  const deleteProject = async () => {
    try {
      await api.delete(`/api/projects/${projectToDelete.id}`);
      fetchProjects();
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
            }}
            fontWeight="bold"
            color="white"
          >
            Projects
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mt: 0.5,
            }}
          >
            Manage and organize all your projects
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            px: 3,
            py: 1.2,
            fontWeight: 600,
          }}
        >
          New Project
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1,
          mb: 4,
          borderRadius: "14px",
          backgroundColor: "#111827",
          border: "1px solid #374151",
          transition: "all 0.2s ease",

          "&:hover": {
            borderColor: "#3b82f6",
          },

          "&:focus-within": {
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 2px rgba(59,130,246,0.2)",
          },
        }}
      >
        <SearchIcon sx={{ color: "#94a3b8" }} />

        <InputBase
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: 1,
            color: "#ffffff",

            "& input::placeholder": {
              color: "#94a3b8",
              opacity: 1,
            },
          }}
        />
      </Box>

      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEditing ? "Update Project" : "Create New Project"}
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setShowForm(false);
              setName("");
              setDescription("");
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={isEditing ? updateProject : createProject}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          Delete Project
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{projectToDelete?.name}</strong>?
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
              setProjectToDelete(null);
            }}
          >
            Cancel
          </Button>

          <Button color="error" variant="contained" onClick={deleteProject}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {filteredProjects.length === 0 ? (
        <Box
          sx={{
            height: "45vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#94a3b8",
          }}
        >
          <FolderIcon sx={{ fontSize: 70, mb: 2 }} />

          <Typography variant="h5" fontWeight={600}>
            No Projects Found
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Create your first project to get started.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Card
                sx={{
                  position: "relative",

                  height: 310,

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",

                  borderRadius: "18px",

                  background: "linear-gradient(145deg,#111827,#0f172a)",

                  border: "1px solid rgba(255,255,255,.08)",

                  transition: ".25s",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,.35)",

                    borderColor: "#3b82f6",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    background: "linear-gradient(180deg,#3b82f6,#8b5cf6)",

                    position: "absolute",

                    left: 0,

                    top: 0,

                    bottom: 0,
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  {/* Header */}

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          background: "rgba(59,130,246,.12)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FolderIcon color="primary" />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      >
                        {project.name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Description */}

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#d1d5db",
                      mt: 2,
                      lineHeight: 1.8,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: 70,
                    }}
                  >
                    {project.description || "No description provided."}
                  </Typography>

                  {/* Push footer */}

                  <Box sx={{ mt: "auto" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#94a3b8",
                      }}
                    >
                      📅{" "}
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Typography>

                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <IconButton
                        color="primary"
                        onClick={() => openEditDialog(project)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => openDeleteDialog(project)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </DashboardLayout>
  );
}

export default ProjectsPage;
