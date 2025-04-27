import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  useTheme,
  IconButton,
  Stack,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './style.css';

const UpdateTransactionForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams(); // Get transaction ID from URL
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [form, setForm] = useState({
    amount: '',
    category: '',
    type: 'expense',
    date: '',
    description: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) setForm({ ...form, amount: value });
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:8000/api/viewTransaction/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched transaction:', res.data);
        if (res.data && res.data.length > 0) {
          setForm(res.data[0]);  // <-- Accessing the first transaction object
        }
      } catch (error) {
        console.error('Failed to fetch transaction!', error.response?.data || error.message);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('Authentication token is missing. Please log in again.');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8000/api/updateTransaction/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      console.log('Transaction updated:', res.data);
      setSuccessMessage('Transaction updated successfully!');
      setErrorMessage(null);

      // Optionally redirect after update
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error('Error updating transaction:', err.response?.data || err.message);
      setErrorMessage('Failed to update transaction.');
    }
  };

  return (
    <Box p={3}>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <FontAwesomeIcon icon={faFile} size="lg" />
        <Typography variant="h5">Update Transaction</Typography>
        <Box flexGrow={1} />
        <IconButton onClick={() => navigate('/dashboard')} color="primary">
          <ArrowBackIcon />
        </IconButton>
      </Stack>

      <Paper
        elevation={3}
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: 3,
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          {successMessage && <Typography color="success.main">{successMessage}</Typography>}
          <Typography variant="h6" gutterBottom>
            Update Your Transaction
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Edit and update your transaction details.
          </Typography>
        </Box>

        <Box sx={{ flex: 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Amount"
                name="amount"
                value={form.amount}
                onChange={handleAmountChange}
                required
                fullWidth
                inputProps={{ inputMode: 'numeric' }}
              />

              <TextField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                select
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                fullWidth
              >
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </TextField>

              <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />

              <TextField
                label="Description"
                name="description"
                multiline
                minRows={2}
                value={form.description}
                onChange={handleChange}
                fullWidth
              />

              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Update Transaction
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateTransactionForm;
