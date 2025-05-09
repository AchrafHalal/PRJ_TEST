import React from "react";
import { Paper, Stack, Box } from "@mui/material";
import BudgetProgress from '../BudgetProgress/BudgetProgress';

function Sectio() {
  return (
    <Box flex={1.2}>
      <Stack spacing={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <BudgetProgress />
        </Paper>
      </Stack>
    </Box>
  );
}

export default Sectio;
