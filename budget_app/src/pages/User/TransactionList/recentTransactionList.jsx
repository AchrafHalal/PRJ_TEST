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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // <-- You forgot to import axios!

export default function RecentTransactions() {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing!");
          return;
        }

        const res = await axios.get("http://localhost:8000/api/listTransaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched Transactions:", res.data);

        if(Array.isArray(res.data)) {
          setTransactions(res.data.slice(0, 5));
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch the data!!", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

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
                    color={tx.type === "expense" ? "error.main" : "success.main"}
                  >
                    {tx.type === "expense" ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={tx.type}
                    color={tx.type === "income" ? "success" : "error"}
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
