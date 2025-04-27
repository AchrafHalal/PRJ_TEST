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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

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

        if (Array.isArray(res.data)) {
          setTransactions(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch the data!!", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/deleteTransaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    } catch (error) {
      console.error('Failed to delete the transaction:', error.response?.data || error.message);
    }
  }

  const handleEdit = (id) => {
    navigate(`/update-transaction/${id}`);
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
                  <Typography color={tx.type === 'expense' ? "error.main" : "success.main"}>
                    {tx.type === 'expense' ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={tx.type}
                    color={tx.type === "income" ? "success" : "error"}
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
