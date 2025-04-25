import React from 'react';
import { Paper, Stack, Box } from '@mui/material';
import MonthlyChart from '../charts/MonthlyChart';
import BudgetProgress from '../BudgetProgress/BudgetProgress';
import TipCard from '../TipCard/TipCard';

export default function SecondSection() {

  return (
    <Stack direction="row" spacing={3} mt={2}>
      <Box flex={1.8}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          <MonthlyChart />
        </Paper>
      </Box>

      <Box flex={1.2}>
        <Stack spacing={3}>
          <TipCard />
          <Paper elevation={3} sx={{ p: 2 }}>
            <BudgetProgress />
          </Paper>
        </Stack>
      </Box>
    </Stack>
  );
}
