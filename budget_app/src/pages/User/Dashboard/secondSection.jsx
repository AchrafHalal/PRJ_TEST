import React from "react";
import { Paper, Stack, Box } from "@mui/material";
import MonthlyChart from "../charts/MonthlyChart";
import GoalCard from "./Cards/GoalCard";

export default function SecondSection() {
  const myGoal = {
    name: "Buy a Car",
    targetAmount: 1200,
    savedAmount: 900.98,
    startDate: "2024-04-01",
    endDate: "2024-04-12",
  };

  return (
    <Stack direction="row" spacing={3} mt={2}>
      <GoalCard goal={myGoal} />
      <Box flex={1.8}>
        <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
          <MonthlyChart />
        </Paper>
      </Box>
    </Stack>
  );
}
