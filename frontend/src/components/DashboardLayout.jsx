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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
const drawerWidth = 240;

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

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
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
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
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            py: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#fff",
            }}
          >
            🚀 TaskFlow
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#94a3b8",
            }}
          >
            Organize • Track • Deliver
          </Typography>
        </Toolbar>

        <List sx={{ flexGrow: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              selected={location.pathname === "/dashboard"}
              onClick={() => navigate("/dashboard")}
              sx={{ buttonStyle }}
            >
              <HomeRoundedIcon sx={{ mr: 2 }} />
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={location.pathname.startsWith("/projects")}
              onClick={() => navigate("/projects")}
              sx={{ buttonStyle }}
            >
              <FolderRoundedIcon sx={{ mr: 2 }} />
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>

          <Divider
            sx={{
              borderColor: "rgba(255,255,255,0.08)",
              mx: 2,
              mb: 2,
            }}
          />
          <Box sx={{ mb: 2 }}>
            <ListItem disablePadding>
              <ListItemButton
                sx={buttonStyle}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("email");

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
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: "#0b1120",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
