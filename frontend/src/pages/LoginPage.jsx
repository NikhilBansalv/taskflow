import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  Link,
  Chip,
  Divider,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import api from "../services/api";
const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#fff",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.05)",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
      borderWidth: "0.5px",
    },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(59,130,246,0.5)",
      borderWidth: 1,
    },
    "&.Mui-focused": { background: "rgba(59,130,246,0.06)" },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.35)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    "&.Mui-focused": { color: "#60a5fa" },
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px #0d1829 inset",
    WebkitTextFillColor: "#fff",
  },
};

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#060d1a",
        backgroundImage:
          "linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow orbs */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
          top: -120,
          right: -80,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,37,235,0.13) 0%, transparent 70%)",
          bottom: -60,
          left: -40,
          pointerEvents: "none",
        }}
      />

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 420,
          p: "40px 36px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.035)",
          border: "0.5px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Badge */}
        <Chip
          icon={
            <FiberManualRecordIcon
              sx={{ fontSize: "8px !important", color: "#3b82f6 !important" }}
            />
          }
          label="Project Management"
          size="small"
          sx={{
            mb: 2.5,
            background: "rgba(37,99,235,0.15)",
            border: "0.5px solid rgba(37,99,235,0.3)",
            borderRadius: "999px",
            color: "#93b4ff",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            height: 26,
          }}
        />

        {/* Brand */}
        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 34,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.5px",
            lineHeight: 1,
            mb: 1,
          }}
        >
          Task
          <Box component="span" sx={{ color: "#3b82f6" }}>
            Flow
          </Box>
        </Typography>

        <Typography
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.38)",
            fontWeight: 300,
            mb: 4,
          }}
        >
          Manage sprints, track issues, ship faster.
        </Typography>

        {/* Error alert */}
        {message && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              background: "rgba(239,68,68,0.12)",
              border: "0.5px solid rgba(239,68,68,0.3)",
              borderRadius: "10px",
              color: "#fca5a5",
              fontSize: 13,
              "& .MuiAlert-icon": { color: "#fca5a5" },
            }}
          >
            {message}
          </Alert>
        )}

        {/* Email */}
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon
                  sx={{ color: "rgba(255,255,255,0.25)", fontSize: 18 }}
                />
              </InputAdornment>
            ),
          }}
          sx={textFieldSx}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon
                  sx={{ color: "rgba(255,255,255,0.25)", fontSize: 18 }}
                />
              </InputAdornment>
            ),
          }}
          sx={textFieldSx}
        />

        <Box sx={{ textAlign: "right", mt: 0.5 }}>
          <Link
            href="/forgot-password"
            underline="none"
            sx={{
              fontSize: 12,
              color: "#60a5fa",
              "&:hover": { color: "#93c5fd" },
            }}
          >
            Forgot password?
          </Link>
        </Box>

        {/* Sign in button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          endIcon={!loading && <ArrowForwardIcon />}
          onClick={handleLogin}
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: 14,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.02em",
            background: "#2563eb",
            boxShadow: "none",
            "&:hover": { background: "#1d4ed8", boxShadow: "none" },
            "&.Mui-disabled": {
              opacity: 0.6,
              background: "#2563eb",
              color: "#fff",
            },
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        {/* Divider */}
        <Divider
          sx={{
            my: 3,
            "&::before, &::after": { borderColor: "rgba(255,255,255,0.08)" },
            color: "rgba(255,255,255,0.2)",
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          New to TaskFlow?
        </Divider>

        <Typography
          textAlign="center"
          sx={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}
        >
          <Link
            href="/register"
            underline="none"
            sx={{
              color: "#60a5fa",
              fontWeight: 500,
              "&:hover": { color: "#93c5fd" },
            }}
          >
            Create an account
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;
