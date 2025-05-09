import React from 'react';
import { Paper, Stack, Box } from '@mui/material';
import MonthlyChart from '../charts/MonthlyChart';


export default function SecondSection() {

  return (
    <Stack direction="row" spacing={3} mt={2}>
      <Box flex={1.8}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          <MonthlyChart />
        </Paper>
      </Box>
    </Stack>
  );
}
