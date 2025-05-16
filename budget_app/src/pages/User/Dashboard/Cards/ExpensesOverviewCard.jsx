import React from "react";
import { useTheme } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesOverviewCard = ({ chartData = [], totals = {} }) => {

  const theme = useTheme();
  const labels = chartData.map((item) => item.name);
  const dataValues = chartData.map((item) => item.value);
  const backgroundColors = chartData.map((item) => item.fill);

  const doughnutData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
        },
      },
    },
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        backgroundColor: theme.palette.background.paper,
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

        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Box width={180} height={180}>
            <Doughnut data={doughnutData} options={options} />
          </Box>
        </Box>

        <Box>
          {chartData.map((item, idx) => (
            <Stack key={idx} direction="row" justifyContent="space-between" mb={0.5}>
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
