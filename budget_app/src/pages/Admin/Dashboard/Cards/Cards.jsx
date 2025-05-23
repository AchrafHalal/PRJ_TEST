import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { CreditCard, Activity, Users } from 'lucide-react';

function Cards({ data }) {
  const cardData = [
    {
      label: 'Transactions',
      value: data?.transactions.toLocaleString(),
      icon: <CreditCard size={28} color="#2c5282" />,
    },
    {
      label: 'Growth Rate',
      value: data?.growth_rate,
      icon: <Activity size={28} color="#2c5282" />,
    },
    {
      label: 'Active Users',
      value: data?.active_users,
      icon: <Users size={28} color="#2c5282" />,
    },
  ];

  return (
    <Box>
      <Grid container spacing={4} mt={1}>
        {cardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <Card
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#e6fffa',
                  borderRadius: '50%',
                  p: 2,
                  mr: 3,
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Cards;
