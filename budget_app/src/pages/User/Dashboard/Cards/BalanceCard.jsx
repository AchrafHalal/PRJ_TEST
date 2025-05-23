import React from "react";
import { Paper, Typography, Stack } from "@mui/material";
import { FaMoneyBillWave } from "react-icons/fa";
import {useTheme} from "@mui/material";

export default function BalanceCard({ balance }) {
  const theme = useTheme();
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance || 0);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        backgroundColor: theme.palette.background.paper,
        padding: "16px",
        "&:hover": {
          transform: "scale(1.01)",
          transition: "0.3s ease-in-out",
        },
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Total Balance
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <FaMoneyBillWave size={36} color="#4caf50" />
        <Typography variant="h4" fontWeight={600}>
          {formatted}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" mt={1}>
        Your available balance across all accounts
      </Typography>
    </Paper>
  );
}
