import React from 'react';
import { Box, Grid, Card, Typography, Divider } from '@mui/material';
import { Users, Activity } from 'lucide-react';

function UserStats({ data }) {
  return (
    <Box>
      <Grid item xs={12} md={4}>
        <Card sx={{
          p: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ backgroundColor: '#e6fffa', borderRadius: '50%', p: 1, mr: 2 }}>
              <Users size={24} color="#2c5282" />
            </Box>
            <Typography variant="h6" fontWeight="bold" color="#2c5282">
              User Statistics
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {['Total Users', 'Active Users', 'New Today'].map((label, i) => {
              const values = [data?.totalUsers, data?.activeUsers, data?.newUsers];
              const colors = ['#1a365d', '#2c5282', '#319795'];
              return (
                <Box sx={{ textAlign: 'center', p: 1 }} key={label}>
                  <Typography variant="h4" fontWeight="bold" color={colors[i]}>
                    {values[i]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Activity size={16} color="#319795" />
              <Typography variant="body2" ml={1} color="text.secondary">
                15% growth this month
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#319795", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              View Details
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Box>
  );
}

export default UserStats;
