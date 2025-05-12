import React from "react";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { RadialBarChart, RadialBar } from "recharts";

const ExpensesOverviewCard = ({ chartData = [], totals = {} }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        backgroundColor: "#ffffff",
        padding: "16px",
        mb: 2,
        "&:hover": {
          transform: "scale(1.01)",
          transition: "0.3s ease-in-out",
        },
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          All expenses
        </Typography>

        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="body2">
            <strong>Daily</strong>
            <br />${totals.daily?.toFixed(2) ?? "0.00"}
          </Typography>
          <Typography variant="body2">
            <strong>Weekly</strong>
            <br />${totals.weekly?.toFixed(2) ?? "0.00"}
          </Typography>
          <Typography variant="body2">
            <strong>Monthly</strong>
            <br />${totals.monthly?.toFixed(2) ?? "0.00"}
          </Typography>
        </Stack>

        <Box display="flex" justifyContent="center" alignItems="center">
          <RadialBarChart
            width={180}
            height={180}
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="100%"
            barSize={10}
            data={chartData}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value" />
          </RadialBarChart>
        </Box>

        <Box mt={1}>
          {chartData.map((item, idx) => (
            <Stack
              key={idx}
              direction="row"
              justifyContent="space-between"
              mb={0.5}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: item.fill,
                  }}
                />
                <Typography variant="body2">{item.name}</Typography>
              </Stack>
              <Typography variant="body2">{item.value}%</Typography>
            </Stack>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpensesOverviewCard;
