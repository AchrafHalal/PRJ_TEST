import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import Cards from './Cards/Cards';
import AdminTeam from './AdminTeam/AdminTeam';
import UserRegistrationChart from './Chart/Chart';
import UserStats from './UserStats/UserStats';


const AdminDashboard = () => {
  const [overviewStats, setOverviewStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchDashboardData = async () => {
      try {
        const [overviewRes, userStatsRes, adminsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/admin/overview', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/admin/user-stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/admin/listAdmins', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setOverviewStats({
          transactions: overviewRes.data.transactions,
          growth_rate: overviewRes.data.growth_rate,
          active_users: overviewRes.data.active_users,
        });

        setUserStats({
          totalUsers: userStatsRes.data.totalUsers,
          activeUsers: userStatsRes.data.activeUsers,
          newUsers: userStatsRes.data.newUsers,
        });

        const adminsData = adminsRes.data?.admins || [];
        const formattedAdmins = adminsData.map(admin => ({
          id: admin.id,
          name: `${admin.firstName} ${admin.lastName}`,
          role: admin.role,
        }));
        setAdmins(formattedAdmins);
        console.log('overview',overviewRes.data);
        console.log('admins',adminsData);
        console.log('userstats',userStats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);




  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="#1a365d">
          Financial Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, Admin! Here's your financial overview for today.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <UserStats data={userStats} />
          <Box mt={2}>
            <AdminTeam data={admins} />
          </Box>
        </Box>

        <Box sx={{ flex: 2, minWidth: 400 }}>
          <Cards data={overviewStats} />
          <Box mt={2}>
            <UserRegistrationChart />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
