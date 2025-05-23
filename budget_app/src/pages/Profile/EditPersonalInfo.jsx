import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, Button, Alert, TextField, Divider } from '@mui/material';
import {useTheme} from '@mui/material';

export default function EditPersonalInfo() {

  const theme = useTheme();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    bio: '',
    location: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`http://localhost:8000/api/profileInfo/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = res.data.user[0];
        console.log('user',user);
        setData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          dateOfBirth: user.dateOfBirth || '',
          bio: user.bio || '',
          location: user.location || '',
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setErrorMessage('Failed to load user data.');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateInfo = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:8000/api/profileInfo/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccessMessage('User updated successfully.');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (error) {
      console.error('Failed to update user:', error);
      setErrorMessage('Failed to update user.');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
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
          backgroundColor: theme.palette.background.paper,
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
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Email"
          name="email"
          value={data.email}
          disabled
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          value={data.dateOfBirth}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Location"
          name="location"
          value={data.location}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Bio"
          name="bio"
          value={data.bio}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 3 }}
          size="small"
        />

        <Divider sx={{ my: 4 }} />

        <Button
          variant="contained"
          onClick={updateInfo}
          sx={{ mt: 2, alignSelf: 'flex-end' }}
        >
          Update
        </Button>
      </Paper>
    </Box>
  );
}
