import React from "react";
import { Paper, Typography, Stack } from "@mui/material";
import { FaMoneyBillWave } from "react-icons/fa";

export default function BalanceCard({ balance }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance || 0);

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
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
