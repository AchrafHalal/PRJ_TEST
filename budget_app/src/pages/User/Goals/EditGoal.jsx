import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

const EditGoal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    target_amount: "",
    saved_amount: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/goals/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData({
          name: res.data.name || "",
          target_amount: res.data.target_amount || "",
          saved_amount: res.data.saved_amount || "",
          notes: res.data.notes || "",
        });
      } catch (error) {
        console.error("Failed to fetch goal", error);
      }
    };

    fetchGoal();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:8000/api/goals/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update goal", error);
    } finally {
      setLoading(false);
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mr:'5px' }}>
          <Box sx={{ pr: 2, minWidth: 250 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Edit a Goal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Update your goal's name, target amount, progress, or notes. Keep
              your financial targets up-to-date.
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
              type="number"
              value={formData.target_amount}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Saved Amount"
              name="saved_amount"
              type="number"
              value={formData.saved_amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Notes"
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
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Goal"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditGoal;
