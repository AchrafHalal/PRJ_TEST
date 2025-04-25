import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  FormControlLabel,
  Checkbox,
  Collapse,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InitForm = () => {
  const [formData, setFormData] = useState({
    salary: '',
    otherIncome: '',
    rent: '',
    utilities: '',
    transport: '',
    groceries: '',
    insurance: '',
    entertainment: '',
    subscriptions: '',
    savingsGoal: '',
    savingsTarget: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showOtherIncome, setShowOtherIncome] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('Authentication token is missing. Please log in again.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/user/setup', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      console.log('Data submitted successfully:', res.data);
      setSuccessMessage('Form submitted successfully!');
      navigate('/dashboard');
      setErrorMessage(null);
    } catch (error) {
      console.error('Submission error:', error);
      setSuccessMessage(null);
      setErrorMessage(error.response?.data?.message || 'Error submitting form');
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
        mt: 70,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          mb: 5,
          color: '#303030',
          textAlign: 'center',
        }}
      >
        Monthly Budget Form
      </Typography>

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
        <form onSubmit={handleSubmit}>
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

          {/* --- Income Section --- */}
          <Typography variant="h5" sx={{ mb: 3, color: '#2F3E46' }}>
            Income Details
          </Typography>

          <TextField
            label="Monthly Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            type="number"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={showOtherIncome}
                onChange={(e) => setShowOtherIncome(e.target.checked)}
              />
            }
            label="Freelance / Side Income?"
            sx={{ mt: 2 }}
          />

          <Collapse in={showOtherIncome}>
            <TextField
              label="Other Income Amount"
              name="otherIncome"
              value={formData.otherIncome}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
              sx={{ mt: 2 }}
            />
          </Collapse>

          <Divider sx={{ my: 4 }} />

          {/* --- Expense Section --- */}
          <Typography variant="h5" sx={{ mb: 3, color: '#2F3E46' }}>
            Expense Details
          </Typography>

          {[
            { label: 'Rent / Mortgage', name: 'rent' },
            { label: 'Utilities (Water, Electricity)', name: 'utilities' },
            { label: 'Transportation (Gas, Bus, etc.)', name: 'transport' },
            { label: 'Food & Groceries', name: 'groceries' },
            { label: 'Insurance (Health, Car, etc.)', name: 'insurance' },
            { label: 'Entertainment & Shopping', name: 'entertainment' },
          ].map((field, index) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
              sx={{ mt: index === 0 ? 0 : 2 }}
            />
          ))}

          <FormControlLabel
            control={
              <Checkbox
                checked={showSubscriptions}
                onChange={(e) => setShowSubscriptions(e.target.checked)}
              />
            }
            label="Do you have any subscriptions (Netflix, Spotify, etc.)?"
            sx={{ mt: 2 }}
          />

          <Collapse in={showSubscriptions}>
            <TextField
              label="Estimated Subscription Total"
              name="subscriptions"
              value={formData.subscriptions}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
              sx={{ mt: 2 }}
            />
          </Collapse>

          <Divider sx={{ my: 4 }} />

          {/* --- Goals Section --- */}
          <Typography variant="h5" sx={{ mb: 3, color: '#2F3E46' }}>
            Financial Goals
          </Typography>

          <TextField
            label="What are you saving for?"
            name="savingsGoal"
            value={formData.savingsGoal}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            type="text"
          />
          <TextField
            label="Target Amount"
            name="savingsTarget"
            value={formData.savingsTarget}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            type="number"
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 4, alignSelf: 'flex-end' }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default InitForm;
