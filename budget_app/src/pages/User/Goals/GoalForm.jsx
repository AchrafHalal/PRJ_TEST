import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  TextField,
} from '@mui/material';

export default function GoalForm() {
  const [data, setData] = useState({
    goalName: '',
    targetAmount: '',
    saving: '',
    notes: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post('http://localhost:8000/api/goals', data);
      setSuccessMessage('Goal created successfully!');
      setData({
        goalName: '',
        targetAmount: '',
        saving: '',
        notes: '',
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred while creating the goal.';
      setErrorMessage(message);
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
        component="form"
        onSubmit={handleSubmit}
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
        <Typography variant="h6" mb={3}>
          Add New Goal
        </Typography>

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
          label="Goal Name"
          name="goalName"
          value={data.goalName}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Target Amount"
          name="targetAmount"
          value={data.targetAmount}
          onChange={handleChange}
          fullWidth
          required
          type="number"
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Monthly Saving Estimate"
          name="saving"
          value={data.saving}
          onChange={handleChange}
          fullWidth
          type="number"
          sx={{ mb: 3 }}
          size="small"
        />
        <TextField
          label="Notes / Description (optional)"
          name="notes"
          value={data.notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 3 }}
          size="small"
        />

        <Button type="submit" variant="contained" color="primary">
          Save Goal
        </Button>
      </Paper>
    </Box>
  );
}
