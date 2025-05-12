import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const GoalCard = ({ goal }) => {

  const navigate = useNavigate();
  const percentage = Math.min(
    (goal.savedAmount / goal.targetAmount) * 100,
    100
  );

  const monthsToAchieve = goal.monthlySaving
    ? Math.ceil((goal.targetAmount - goal.savedAmount) / goal.monthlySaving)
    : "N/A";

  return (
    <Card sx={{ width: 300, borderRadius: 3, boxShadow: 3, m: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            {goal.name}
          </Typography>
          <IconButton size="small" onClick={()=>navigate('/editGoal')}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {goal.startDate} – {goal.endDate || "Ongoing"}
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
              <strong>${goal.savedAmount}</strong>
              <div style={{ fontSize: 12 }}>of ${goal.targetAmount}</div>
            </div>
          </CircularProgressbarWithChildren>
        </Box>

        <Typography variant="body2" align="center">
          Est. {monthsToAchieve} months to goal 🎯
        </Typography>

      
      </CardContent>
    </Card>
  );
};

export default GoalCard;
