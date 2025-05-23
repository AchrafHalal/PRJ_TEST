import React from "react";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import FirstSection from "./firstSection";
import SecondSection from "./secondSection";
import ThirdSection from "./thirdSection";
import ExpensesOverviewCard from "./Cards/ExpensesOverviewCard";
import TipCard from "../TipCard/TipCard";
import MonthlyChart from "../charts/MonthlyChart";


export default function Dashboard({ profileData, firstName, overviewData, onDownloadReport, monthlySummary, transactions, goals  }) {
 
  return (
    <div>
      <Box
        sx={{
          textAlign: "right",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          px: 3,
          mt: "15px",
          mb: "15px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4">Good Morning, {firstName}</Typography>
          <Typography sx={{ fontSize: "13px", textAlign: "left" }}>
            This is your report
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadOutlined />}
          onClick={onDownloadReport}
          sx={{ padding: "2px 16px", minHeight: "30px" }}
        >
          Download Report
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 3 }}>
          <FirstSection profileData={profileData}  />
          <SecondSection data={monthlySummary} goals={goals} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <ExpensesOverviewCard
            chartData={overviewData.chartData}
            totals={overviewData.totals}
          />
          
          <TipCard />
        </Box>
      </Box>

      <ThirdSection data={transactions} />
    </div>
  );
}

