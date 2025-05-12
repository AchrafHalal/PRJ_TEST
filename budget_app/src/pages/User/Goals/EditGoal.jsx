import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  TextField,
  CircularProgress,
} from '@mui/material';

export default function EditGoalForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [data, setData] = useState({
    goalName: '',
    targetAmount: '',
    saving: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/goals/${id}`);
        setData(response.data);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to load goal data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.put(`http://localhost:8000/api/goals/${id}`, data);
      setSuccessMessage('Goal updated successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred while updating the goal.';
      setErrorMessage(message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

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
          Edit Goal
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
          label="Notes / Description"
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
          Update Goal
        </Button>
      </Paper>
    </Box>
  );
}
