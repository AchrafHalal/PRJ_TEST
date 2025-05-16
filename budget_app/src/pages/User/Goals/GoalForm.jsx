import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import axios from "axios";

const CreateGoalForm = ({ onGoalCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    target_amount: "",
    saved_amount: "",
    notes: "",
  });

  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/goals", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (onGoalCreated) onGoalCreated();
      setFormData({ name: "", target_amount: "", saved_amount: "", notes: "" });
    } catch (error) {
      console.error("Failed to create goal", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 4,
        borderRadius: 3,
        backgroundColor: theme.palette.background,
      }}
    >
      <Box container sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Typography */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mr:'5px' }}>
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Create a Goal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Set a goal to start tracking your financial progress. You can
              define the name, target amount, and add notes.
            </Typography>
          </Box>

          <Box
            item
            md="auto"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "stretch",
              px: 1,
              height: "150px",
            }}
          >
            <Divider orientation="vertical" flexItem />
          </Box>
        </Box>

        {/* Right Side - Form */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={500}>
              Goal Details
            </Typography>
            <IconButton onClick={() => navigate("/dashboard")} color="primary">
              <ArrowBackIcon />
            </IconButton>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Goal Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Target Amount"
              name="target_amount"
              value={formData.target_amount}
              onChange={handleChange}
              type="number"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Saved Amount"
              name="saved_amount"
              value={formData.saved_amount}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Notes (optional)"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
            >
              Create Goal
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateGoalForm;
