// src/pages/TransactionList.jsx

import {
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Typography,
    Paper,
    IconButton,
    Chip,
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { useState } from "react";
  
  // Sample transactions data (replace with API data later)
  const initialTransactions = [
    { id: 1, date: "2025-04-10", category: "Groceries", amount: -45.75, type: "Expense" },
    { id: 2, date: "2025-04-09", category: "Freelance", amount: 1200, type: "Income" },
    { id: 3, date: "2025-04-08", category: "Transport", amount: -30.0, type: "Expense" },
  ];
  
  export default function TransactionList() {
    const [transactions, setTransactions] = useState(initialTransactions);
  
    const handleDelete = (id) => {
      const filtered = transactions.filter((tx) => tx.id !== id);
      setTransactions(filtered);
    };
  
    const handleEdit = (id) => {
      // You can navigate to edit page or open a modal here
      alert(`Edit transaction with ID: ${id}`);
    };
  
    return (
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          All Transactions
        </Typography>
  
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.category}</TableCell>
                  <TableCell>
                    <Typography color={tx.amount < 0 ? "error" : "success.main"}>
                      {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={tx.type}
                      color={tx.type === "Income" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(tx.id)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(tx.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
  
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No transactions to show.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  