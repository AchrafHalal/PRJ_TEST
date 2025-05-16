import React from "react";
import { Paper, Stack, Box } from "@mui/material";
import MonthlyChart from "../charts/MonthlyChart";
import GoalCard from "./Cards/GoalCard";

export default function SecondSection({data,goals}) {
 

  return (
    <Stack direction="row" spacing={3} mt={2}>
      {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
      <Box flex={1.8}>
        <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
          <MonthlyChart data={data} />

        </Paper>
      </Box>
    </Stack>
  );
}
