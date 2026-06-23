import { Card, CardContent, Typography } from "@mui/material";

function StatCard({ title, value }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography color="text.secondary">{title}</Typography>

        <Typography variant="h3" fontWeight="bold" mt={2}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
