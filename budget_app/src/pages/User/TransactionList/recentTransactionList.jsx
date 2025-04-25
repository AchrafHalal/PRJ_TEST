import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Paper,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const transactions = [
  { id: 1, date: "2025-04-10", category: "Groceries", amount: -45.75, type: "Expense" },
  { id: 2, date: "2025-04-09", category: "Freelance", amount: 1200, type: "Income" },
  { id: 3, date: "2025-04-08", category: "Utilities", amount: -80.99, type: "Expense" },
  { id: 4, date: "2025-04-06", category: "Transport", amount: -20.0, type: "Expense" },
  { id: 5, date: "2025-04-03", category: "Investment Return", amount: 350.5, type: "Income" },
];

export default function RecentTransactions() {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Recent Transactions
        </Typography>
        <Button
          component={Link}
          to="/transactions"
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          View All
        </Button>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={tx.amount < 0 ? "error.main" : "success.main"}
                  >
                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={tx.type}
                    color={tx.type === "Income" ? "success" : "error"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
