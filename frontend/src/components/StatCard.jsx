import { Card, CardContent, Typography, Box } from "@mui/material";

function StatCard({ title, value, icon, color }) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "18px",
        background: "linear-gradient(145deg,#111827,#0f172a)",
        border: "1px solid rgba(255,255,255,.08)",
        transition: "0.25s",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 35px rgba(0,0,0,.35)",
          borderColor: color,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              color: "#94a3b8",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: `${color}20`,
              color,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          variant="h3"
          sx={{
            mt: 3,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
