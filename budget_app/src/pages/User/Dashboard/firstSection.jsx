import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";

import BalanceCard from "./Cards/BalanceCard";
import IncomeCard from "./Cards/IncomeCard";
import ExpenseCard from "./Cards/ExpenseCard";

export default function FirstSection({profileData}) {
  const [salary, setSalary] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [incomes, setIncomes] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [monthlyExpenses, setMonthlyExpenses] = useState(null);



  useEffect(() => {
    if (profileData) {
      
      setSalary(profileData.profile.salary);
      setExpenses(profileData.combined_total_expenses);
      setIncomes(profileData.combined_total_income);
      setMonthlyIncome(profileData.monthly_income);
      setMonthlyExpenses(profileData.monthly_expenses);
    }
  }, [profileData])

  const percentChangeIncome = rescaleChange(monthlyIncome, incomes);
  const percentChangeExpenses = rescaleChange(monthlyExpenses, expenses);

  return (
    <Box sx={{display:'flex', flexDirection:'row', gap:2}} spacing={3}>
      <Grid item xs={12} md={4} flexGrow={1}>
        <BalanceCard balance={salary} />
      </Grid>
      <Grid item xs={12} md={4}>
        <IncomeCard
          totalIncome={monthlyIncome}
          percentChange={percentChangeIncome}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ExpenseCard
          totalExpenses={monthlyExpenses}
          percentChange={percentChangeExpenses}
        />
      </Grid>
      <Grid item xs={12} md={4}>
      </Grid>
      
    </Box>
  );
}

// Optional helper to calculate percent change (can be customized)
function rescaleChange(currentMonth, total) {
  if (!currentMonth || !total || total === 0) return 0;
  return ((currentMonth / total) * 100).toFixed(1);
}
