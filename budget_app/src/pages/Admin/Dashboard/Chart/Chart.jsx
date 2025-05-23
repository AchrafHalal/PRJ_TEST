import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const UserRegistrationChart = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/monthlyRegistrations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        const apiData = res.data.data;

        // Merge API data with full month list
        const mergedData = months.map(month => {
          const found = apiData.find(item => item.month === month);
          return {
            month,
            users: found ? found.users : 0
          };
        });

        setData(mergedData);
      })
      .catch(err => {
        console.error('Error fetching user registration data:', err);
      });
  }, []);

  return (
    <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly User Registrations
        </Typography>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#1976d2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRegistrationChart;
