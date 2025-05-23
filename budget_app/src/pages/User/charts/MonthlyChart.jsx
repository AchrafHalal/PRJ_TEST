import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Paper, Typography, useTheme } from "@mui/material";

export default function MonthlyChart() {
  const theme = useTheme();
  const [monthlySummary, setMonthlySummary] = useState([
    { month: "Jan", income: 0, expenses: 0 },
    { month: "Feb", income: 0, expenses: 0 },
    { month: "Mar", income: 0, expenses: 0 },
    { month: "Apr", income: 0, expenses: 0 },
    { month: "May", income: 0, expenses: 0 },
    { month: "Jun", income: 0, expenses: 0 },
    { month: "Jul", income: 0, expenses: 0 },
    { month: "Aug", income: 0, expenses: 0 },
    { month: "Sep", income: 0, expenses: 0 },
    { month: "Oct", income: 0, expenses: 0 },
    { month: "Nov", income: 0, expenses: 0 },
    { month: "Dec", income: 0, expenses: 0 },
  ]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:8000/api/user/monthly-summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMonthlySummary((prevData) =>
          prevData.map((item) => {
            const found = res.data.find((d) => d.month.startsWith(item.month));
            return found
              ? {
                  ...item,
                  income: found.income,
                  expenses: found.expenses,
                }
              : item;
          })
        );
      } catch (error) {
        console.error("Error fetching monthly summary:", error);
      }
    };

    fetchMonthlySummary();
  }, [token]); // Only fetch once when token is available

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Monthly Income vs Expenses
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlySummary} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke={theme.palette.success.main}
            strokeWidth={3}
            dot={{ r: 0 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke={theme.palette.error.main}
            strokeWidth={3}
            dot={{ r: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
