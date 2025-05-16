import React from "react";
import { Paper, Stack } from "@mui/material";
import RecentTransactions from "../TransactionList/recentTransactionList";

export default function ThirdSection({data}) {
  return (
    <div>
      <Stack sx={{ mt: 2 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <RecentTransactions data={data} />
        </Paper>
      </Stack>
    </div>
  );
}
