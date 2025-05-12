import React from "react";
import { Paper, Typography, Stack } from "@mui/material";
import { FaWallet } from "react-icons/fa";

export default function ExpenseCard({ totalExpenses, percentChange }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalExpenses || 0);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        backgroundColor: "#ffffff",
        padding: "16px",
        "&:hover": {
          transform: "scale(1.01)",
          transition: "0.3s ease-in-out",
        },
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Monthly Expenses
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <FaWallet size={36} color="#f44336" />
        <Typography variant="h4" fontWeight={600}>
          {formatted}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" mt={1}>
        {percentChange >= 0
          ? `↑ ${percentChange}% increase`
          : `↓ ${Math.abs(percentChange)}% decrease`}{" "}
        from last month
      </Typography>
    </Paper>
  );
}
