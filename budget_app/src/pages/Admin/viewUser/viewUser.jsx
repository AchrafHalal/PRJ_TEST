import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Paper, Button, Alert, TextField, Divider } from '@mui/material';

export default function ViewUserForm() {
  const [data, setData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth:'',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`http://localhost:8000/api/admin/viewUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = res.data.user[0];
        setData({
          id: user.id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          dateOfBirth: user.dateOfBirth || '',
          password: '••••••••'
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setErrorMessage('Failed to load user data.');
      }
    };

    fetchUser();
  }, [id]);

  const deleteUser = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:8000/api/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccessMessage('User deleted successfully.');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (error) {
      console.error('Failed to delete user:', error);
      setErrorMessage('Failed to delete user.');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#EDEEE9',
        minHeight: '100vh',
        p: { xs: 3, md: 6 },
        fontFamily: "'Inter', sans-serif",
        flexGrow: 1,
        px: 3,
      }}
    >

      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 3, md: 5 },
          backgroundColor: '#FFFFFF',
          maxWidth: 800,
          mx: 'auto',
          borderRadius: 4,
        }}
      >
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <TextField
          label="ID"
          value={data.id}
          disabled
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="First Name"
          value={data.firstName}
          disabled
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Last Name"
          value={data.lastName}
          disabled
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Email"
          value={data.email}
          disabled
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Date de Naissance"
          value={data.dateOfBirth}
          disabled
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Password"
          value={data.password}
          disabled
          type="password"
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />

        <Divider sx={{ my: 4 }} />

        <Button
          variant="contained"
          color="error"
          onClick={()=>{
            const result =window.confirm('Are you sure you want to delette this user !!');
            if(result)
            {
              deleteUser();
              navigate('/admin');
            }

          }}
          sx={{ mt: 2, alignSelf: 'flex-end' }}
        >
          Delete User
        </Button>
      </Paper>
    </Box>
  );
}
