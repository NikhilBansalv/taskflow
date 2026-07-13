import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import SnackbarAlert from "../components/SnackbarAlert";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [name, setName] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/api/users/me");
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const openEditDialog = () => {
    setName(user.name);
    setEditDialogOpen(true);
  };

  const updateProfile = async () => {
    try {
      const response = await api.put("/api/users/me", {
        name,
      });

      setUser(response.data);
      setEditDialogOpen(false);

      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to update profile.",
        severity: "error",
      });
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <Typography sx={{ color: "#fff" }}>Loading profile...</Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: 700,
          mb: 4,
        }}
      >
        My Profile
      </Typography>

      <Paper
        sx={{
          p: { xs: 2.5, sm: 4 },
          borderRadius: 4,
          background: "linear-gradient(145deg,#111827,#0f172a)",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 3,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              fontSize: 30,
              bgcolor: "#2563eb",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
              {user.name}
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                mt: 0.5,
                overflowWrap: "anywhere",
              }}
            >
              {user.email}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={openEditDialog}
            sx={{
              ml: { xs: 0, sm: "auto" },
              width: { xs: "100%", sm: "auto" },
              textTransform: "none",
            }}
          >
            Edit Profile
          </Button>
        </Box>
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          <Box>
            <Typography sx={{ color: "#64748b", fontSize: 13 }}>
              Full Name
            </Typography>
            <Typography sx={{ color: "#fff", mt: 0.5, fontWeight: 600 }}>
              {user.name}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: "#64748b", fontSize: 13 }}>
              Email Address
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                mt: 0.5,
                fontWeight: 600,
                overflowWrap: "anywhere",
              }}
            >
              {user.email}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: "#64748b", fontSize: 13 }}>
              Member Since
            </Typography>
            <Typography sx={{ color: "#fff", mt: 0.5, fontWeight: 600 }}>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            m: { xs: 2, sm: 4 },
            width: { xs: "calc(100% - 32px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={updateProfile}
            disabled={!name.trim()}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
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

export default ProfilePage;
