import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";

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

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Projects
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            padding: "10px 18px",
          }}
        >
          New Project
        </Button>
      </div>

      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Project</DialogTitle>

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

          <Button variant="contained" onClick={createProject}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} lg={4} key={project.id}>
            <Card
              sx={{
                height: 310,
                display: "flex",
                flexDirection: "column",

                background: "linear-gradient(145deg, #111827, #0f172a)",

                border: "1px solid rgba(255,255,255,0.08)",

                borderRadius: "18px",

                transition: "all .25s ease",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 18px 35px rgba(0,0,0,.35)",
                  borderColor: "#3b82f6",
                },
              }}
            >
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
                    <FolderIcon color="primary" />

                    <Typography variant="h6" fontWeight={700} color="white">
                      {project.name}
                    </Typography>
                  </Box>
                </Box>

                {/* Description */}

                <Typography
                  variant="body2"
                  sx={{
                    color: "#cbd5e1",

                    mt: 2,

                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",

                    overflow: "hidden",

                    textOverflow: "ellipsis",

                    minHeight: 70,

                    lineHeight: 1.8,
                  }}
                >
                  {project.description || "No description"}
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
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}

export default ProjectsPage;
