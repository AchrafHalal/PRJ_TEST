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
import "./App.css";

const Reports = () => <h1>Reports</h1>;
const Goals = () => <h1>Goals & Budgets</h1>;
const Settings = () => <h1>Settings</h1>;
const Logout = () => {
  localStorage.removeItem("token");
  localStorage.clear();
  return <Navigate to="/login" />;
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") || "light"
  );
  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "admin");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [overviewData, setOverviewData] = useState({
    chartData: [],
    totals: { daily: 0, weekly: 0, monthly: 0 },
  });
  const [notifications, setNotifications] = useState([]);

  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/report/download", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/pdf',
        },
      });

      const blob = await response.blob();
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
    const fetchData = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfileData(res.data);
        setFirstName(res.data.profile.user.firstName);

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
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();

    const fetchNotifications = async () => {
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
                  {isAdmin ? (
                    <TopBar
                      open={open}
                      style={{ backgroundColor: theme.palette.admin }}
                      handleDrawerOpen={() => setOpen(true)}
                      setMode={setMode}
                      notifications={notifications}
                    />
                  ) : (
                    <TopBar
                      open={open}
                      handleDrawerOpen={() => setOpen(true)}
                      setMode={setMode}
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

                  <Box component="main" sx={{ flexGrow: 1, p: 3, m: 0 }}>
                    <DrawerHeader />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route
                        path="/dashboard"
                        element={
                          <Dashboard
                            profileData={profileData}
                            firstName={firstName}
                            overviewData={overviewData}
                            onDownloadReport={handleDownloadPDF}
                          />
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
                      <Route path="/reports" element={<Reports />} />
                      {isAdmin && <Route path="/admin" element={<Admin />} />}
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
                      <Route path="/coach" element={<InitForm />} />
                      <Route path="/settings" element={<Settings />} />
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
