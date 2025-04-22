import { Box, Typography, LinearProgress } from "@mui/material";

const monthlyBudget = 4000;  // Example budget
const currentSpending = 2985; // Example current spending

export default function BudgetProgress() {
  const percentage = Math.min((currentSpending / monthlyBudget) * 100, 100);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Monthly Budget Usage
      </Typography>

      <Typography variant="body2" color={percentage > 90 ? "error.main" : "text.secondary"}>
        ${currentSpending.toFixed(2)} spent of ${monthlyBudget.toFixed(2)}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 12,
          borderRadius: 5,
          mt: 1,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: percentage > 90 ? "#f44336" : "#1976d2",
          },
        }}
      />

      <Typography variant="caption" mt={1} display="block">
        {percentage.toFixed(1)}% of your budget used
      </Typography>
    </Box>
  );
}
