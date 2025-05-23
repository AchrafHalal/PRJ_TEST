import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import {useTheme} from "@mui/material";
import axios from "axios";

const GoalCard = ({ goal }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [additionalSaving, setAdditionalSaving] = useState("");
  const [saved, setSaved] = useState(Number(goal.saved_amount) || 0);
  const [target] = useState(Number(goal.target_amount) || 1);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAdditionalSaving(e.target.value);
  };

  const handleSave = async () => {
    const newSavedAmount = saved + Number(additionalSaving);

    // Update the saved amount in the UI immediately
    setSaved(newSavedAmount);

    // Send the updated saved amount to the backend
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/goals/${goal.id}`,
        { saved_amount: newSavedAmount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Goal updated:", res.data);
      setAdditionalSaving("");
      setLoading(false);
    } catch (error) {
      console.error("Failed to update goal", error);
      setLoading(false);
    }
  };

  const percentage = Math.min((saved / target) * 100, 100);

  const monthsToAchieve = Math.ceil(target / saved) || "N/A";

  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 3,
        p: 3,
        background: theme.palette.background.paper,
        borderLeft: "5px solid #00c853",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        m: 2,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            {goal.name}
          </Typography>
          <IconButton
            size="small"
            onClick={() => navigate(`/editGoal/${goal.id}`)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Start Saving at: {new Date(goal.created_at).toLocaleDateString()}
        </Typography>

        <Box sx={{ width: 160, height: 160, mx: "auto", my: 2 }}>
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              pathColor: "#00c853",
              trailColor: "#e0e0e0",
            })}
          >
            <div style={{ fontSize: 14, textAlign: "center" }}>
              <strong>${saved}</strong>
              <div style={{ fontSize: 12 }}>of ${target}</div>
            </div>
          </CircularProgressbarWithChildren>
        </Box>

        <Typography variant="body2" align="center">
          Est. {monthsToAchieve} months to goal 🎯
        </Typography>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <TextField
            label="Add Savings"
            type="number"
            value={additionalSaving}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading || !additionalSaving}
          >
            {loading ? "Saving..." : "Add Saving"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
