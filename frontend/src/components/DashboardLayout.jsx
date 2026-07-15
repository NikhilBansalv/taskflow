import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useEffect, useState } from "react";
import api from "../services/api";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
const drawerWidth = 240;

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("email");
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/users/me");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const buttonStyle = {
    borderRadius: 2,
    mx: 1,
    my: 0.5,

    "&.Mui-selected": {
      backgroundColor: "#0051ff",
      color: "#fff",
    },

    "&.Mui-selected:hover": {
      backgroundColor: "#1d4ed8",
    },

    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.08)",
    },
  };
  const drawerContent = (
    <>
      <Toolbar
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          py: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>
          🚀 TaskFlow
        </Typography>

        <Typography variant="body2" sx={{ color: "#94a3b8" }}>
          Organize • Track • Deliver
        </Typography>
      </Toolbar>

      <List
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname === "/dashboard"}
            onClick={() => {
              navigate("/dashboard");
              setMobileOpen(false);
            }}
            sx={buttonStyle}
          >
            <HomeRoundedIcon sx={{ mr: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname.startsWith("/projects")}
            onClick={() => {
              navigate("/projects");
              setMobileOpen(false);
            }}
            sx={buttonStyle}
          >
            <FolderRoundedIcon sx={{ mr: 2 }} />
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>

        <Box sx={{ mt: "auto", mb: 2 }}>
          <Box sx={{ mt: "auto", mb: 2 }}>
            <Divider
              sx={{
                borderColor: "rgba(255,255,255,0.08)",
                mx: 2,
                mb: 2,
              }}
            />

            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === "/profile"}
                onClick={() => {
                  navigate("/profile");
                  setMobileOpen(false);
                }}
                sx={buttonStyle}
              >
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    mr: 1.5,
                    bgcolor: "#2563eb",
                    fontSize: 14,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>

                <ListItemText
                  primary={user?.name || "My Profile"}
                  secondary={user?.email || email}
                  slotProps={{
                    primary: {
                      sx: { color: "#fff", fontSize: 14 },
                    },
                    secondary: {
                      sx: {
                        color: "#94a3b8",
                        fontSize: 11,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={buttonStyle}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("email");
                  setMobileOpen(false);
                  navigate("/");
                }}
              >
                <LogoutRoundedIcon sx={{ mr: 2 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                color: "#64748b",
                mt: 2,
              }}
            >
              TaskFlow v1.0
            </Typography>
          </Box>
        </Box>
      </List>
    </>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg,#111827,#0f172a)",
            color: "#ffffff",
            borderRight: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg,#111827,#0f172a)",
            color: "#ffffff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "#0b1120",
          minHeight: "100vh",
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#fff",
            mb: 2,
            width: 44,
            height: 44,
            backgroundColor: "#111827",
            border: "1px solid rgba(255,255,255,0.08)",

            "&:hover": {
              backgroundColor: "#1f2937",
            },
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
