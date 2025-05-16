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

export default function RecentTransactions({ data }) {
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
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
            {Array.isArray(data) && data.length > 0 ? (
              data.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.category}</TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={
                        tx.type === "expense" ? "error.main" : "success.main"
                      }
                    >
                      {tx.type === "expense" ? "-" : "+"}$
                      {Math.abs(tx.amount).toFixed(2)}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No recent transactions available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
