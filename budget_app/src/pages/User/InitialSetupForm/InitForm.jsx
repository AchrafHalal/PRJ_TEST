import React, { useState } from "react";
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
} from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InitForm = () => {
  const [formData, setFormData] = useState({
    salary: "",
    otherIncome: "",
    rent: "",
    utilities: "",
    transport: "",
    groceries: "",
    insurance: "",
    entertainment: "",
    subscriptions: "",
    savingsGoal: "",
    savingsTarget: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showOtherIncome, setShowOtherIncome] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Authentication token is missing. Please log in again.");
      return;
    }

    try {
      const setupPayload = {
        salary: formData.salary,
        otherIncome: showOtherIncome ? formData.otherIncome : 0,
        rent: formData.rent,
        utilities: formData.utilities,
        transport: formData.transport,
        groceries: formData.groceries,
        insurance: formData.insurance,
        entertainment: formData.entertainment,
        subscriptions: showSubscriptions ? formData.subscriptions : 0,
      };

      await axios.post("http://localhost:8000/api/user/setup", setupPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (formData.savingsGoal && formData.savingsTarget) {
        const goalPayload = {
          name: formData.savingsGoal,
          target_amount: formData.savingsTarget,
        };

        await axios.post("http://localhost:8000/api/goals", goalPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }

      setSuccessMessage("Form submitted successfully!");
      setErrorMessage(null);
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      setSuccessMessage(null);
      setErrorMessage(error.response?.data?.message || "Error submitting form");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EDEEE9",
        minHeight: "100vh",
        p: { xs: 3, md: 6 },
        fontFamily: "'Inter', sans-serif",
        flexGrow: 1,
        px: 3,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1rem", md: "2rem" },
          mb: 3,
          color: theme.palette.text.primary,
          textAlign: "center",
          width:'350px'
        }}
      >
        "You're in! Just a few quick steps to tailor your financial journey."
      </Typography>

      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: { xs: 2, md: 4 },
          backgroundColor: theme.palette.background.paper,
          maxWidth: 800,
          mx: "auto",
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
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
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
            size="small"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={showOtherIncome}
                onChange={(e) => setShowOtherIncome(e.target.checked)}
              />
            }
            label="Freelance / Side Income?"
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
              size="small"
            />
          </Collapse>

          <Divider sx={{ my: 2 }} />

          {/* --- Expense Section --- */}
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            Expense Details
          </Typography>

          {[
            { label: "Rent / Mortgage", name: "rent" },
            { label: "Utilities (Water, Electricity)", name: "utilities" },
            { label: "Transportation (Gas, Bus, etc.)", name: "transport" },
            { label: "Food & Groceries", name: "groceries" },
            { label: "Insurance (Health, Car, etc.)", name: "insurance" },
            { label: "Entertainment & Shopping", name: "entertainment" },
          ].map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
              size="small"
              sx={{ mb: 2 }}
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
              size="small"
            />
          </Collapse>

          <Divider sx={{ my: 2 }} />

          {/* --- Goals Section --- */}
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
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
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Target Amount"
            name="savingsTarget"
            value={formData.savingsTarget}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            type="number"
            size="small"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, alignSelf: "flex-end" }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default InitForm;
