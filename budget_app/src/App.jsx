import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/sideBar";
import SideBarAdmin from "./components/sideBarAdmin";
import TopBar from "./components/topBar";
import Dashboard from "./pages/User/Dashboard/dashboard";
import TransactionForm from "./pages/User/TransactionForm/transactionForm";
import TransactionList from "./pages/User/TransactionList/transactionList";
import { getDesignTokens } from "./theme";
import InitForm from "./pages/User/InitialSetupForm/InitForm";
import Login from "./pages/Auth/Login/login";
import Signup from "./pages/Auth/Signup/signup";
import Admin from "./pages/Admin/ListUsers/admin";
import ViewUser from "./pages/Admin/viewUser/viewUser";
import UpdateTrs from "./pages/User/TransactionList/update/updateTransaction";
import MonthlyReports from "./pages/User/Reports/MonthlyReports";
import GoalForm from "./pages/User/Goals/GoalForm";
import EditGoal from "./pages/User/Goals/EditGoal";
import Profile from "./pages/Profile/profile";
import EditPersonalInfo from "./pages/Profile/EditPersonalInfo";
import "./App.css";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import { fetchRows } from './pages/Admin/ListUsers/rows'; 


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  const profile = JSON.parse(localStorage.getItem("profileData") || "{}");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (profile?.profile && profile.profile.setupCompleted === false) {
    return <Navigate to="/coach" />;
  }

  return children;
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") || "light"
  );
  const [profileData, setProfileData] = useState(null);
  const isAdmin = profileData?.profile?.user?.role === "admin";

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const token = localStorage.getItem("token");
  const [firstName, setFirstName] = useState("");
  const [overviewData, setOverviewData] = useState({
    chartData: [],
    totals: { daily: 0, weekly: 0, monthly: 0 },
  });
  const [notifications, setNotifications] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/report/download", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "financial-report.pdf";
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    const fetchProfileAndOverview = async () => {
      if (!token || profileData) return;

      try {
        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = res.data;
        const role = profile?.profile?.user?.role;

        setProfileData(profile);
        setFirstName(profile.profile.user.firstName);
        localStorage.setItem("profileData", JSON.stringify(profile));

        if (role !== "admin") {
          const overviewRes = await axios.get(
            "http://localhost:8000/api/expenses/overview",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const {
            daily,
            weekly,
            monthly,
            category_expenses = [],
          } = overviewRes.data;

          const formattedChartData = category_expenses.map((item) => ({
            name: item.name || item.category || "Unknown",
            value:
              monthly > 0
                ? Number(((item.amount / monthly) * 100).toFixed(1))
                : 0,
            fill: item.fill || "#8884d8",
          }));

          setOverviewData({
            chartData:
              formattedChartData.length > 0
                ? formattedChartData
                : [{ name: "No Data", value: 0, fill: "#e0e0e0" }],
            totals: { daily, weekly, monthly },
          });
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          console.error(
            "Error fetching",
            err.config?.url,
            "->",
            err.response?.status
          );
        }
      }
    };

    fetchProfileAndOverview();
  }, [token, profileData]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:8000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data || []);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };

    fetchNotifications();
  }, [token]);

  useEffect(() => {
    const fetchListTransaction = async () => {
      if (!token || transactions.length > 0) return;

      try {
        const res = await axios.get(
          "http://localhost:8000/api/listTransaction",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (Array.isArray(res.data)) {
          setTransactions(res.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchListTransaction();
  }, [token, transactions]);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!token || goals.length > 0) return;

      try {
        const res = await axios.get("http://localhost:8000/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(res.data);
      } catch (err) {
        console.error("Failed to fetch goals:", err);
      }
    };

    fetchGoals();
  }, [token, goals]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
   if (isAdmin) {
      const loadData = async () => {
        const data = await fetchRows();
        setRows(data);
      };
      loadData();
    }
  }, [isAdmin]);  

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Box sx={{ display: "flex" }}>
                  {isAdmin ? (<TopBar
                    open={open}
                    handleDrawerOpen={() => setOpen(true)}
                    setMode={setMode}
                    notifications={notifications}
                    backgroundColor={theme.palette.admin}
                  />) : (
                     <TopBar
                    open={open}
                    handleDrawerOpen={() => setOpen(true)}
                    setMode={setMode}
                    notifications={notifications}
                  />
                  )}
                 
                  {isAdmin ? (
                    <SideBarAdmin
                      open={open}
                      handleDrawerClose={() => setOpen(false)}
                      user={profileData}
                    />
                  ) : (
                    <SideBar
                      open={open}
                      handleDrawerClose={() => setOpen(false)}
                      user={profileData}
                    />
                  )}

                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route
                        path="/dashboard"
                        element={
                          isAdmin ? (
                            <AdminDashboard />
                          ) : (
                            <Dashboard
                              profileData={profileData}
                              firstName={firstName}
                              overviewData={overviewData}
                              onDownloadReport={handleDownloadPDF}
                              transactions={transactions}
                              goals={goals}
                            />
                          )
                        }
                      />

                      <Route
                        path="/add-transaction"
                        element={<TransactionForm />}
                      />
                      <Route
                        path="/transactions"
                        element={<TransactionList />}
                      />
                      <Route path="/reports" element={<MonthlyReports />} />
                      {isAdmin && <Route path="/admin" element={<Admin rows={rows}/>} />}
                      {isAdmin && (
                        <Route
                          path="/admin/view-user/:id"
                          element={<ViewUser />}
                        />
                      )}
                      <Route
                        path="/update-transaction/:id"
                        element={<UpdateTrs />}
                      />
                      <Route path="/initForm" element={<InitForm />} />
                      <Route path="/goals" element={<GoalForm />} />
                      <Route path="/editGoal/:id" element={<EditGoal />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/editInfo/:id"
                        element={<EditPersonalInfo />}
                      />
                      <Route path="*" element={<h1>Page Not Found</h1>} />
                    </Routes>
                  </Box>
                </Box>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
