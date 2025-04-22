import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/sideBar';
import TopBar from './components/topBar';
import Dashboard from './pages/Dashboard/dashboard';
import TransactionForm from './pages/TransactionForm/transactionForm';
import TransactionList from './pages/TransactionList/transactionList';
import { getDesignTokens } from './theme';
import InitForm from './pages/InitialSetupForm/InitForm';
import Login from './pages/Auth/Login/login';
import Signup from './pages/Auth/Signup/signup';

const Reports = () => <h1>Reports</h1>;
const Goals = () => <h1>Goals & Budgets</h1>;
const Settings = () => <h1>Settings</h1>;
const Logout = () => {
  localStorage.removeItem('token');
  return <Navigate to="/login" />;
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem('currentMode') || 'light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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
                <Box sx={{ display: 'flex' }}>

                  <TopBar open={open} handleDrawerOpen={() => setOpen(true)} setMode={setMode} />
                  <SideBar open={open} handleDrawerClose={() => setOpen(false)} />

                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/add-transaction" element={<TransactionForm />} />
                      <Route path="/transactions" element={<TransactionList />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/goals" element={<Goals />} />
                      <Route path="/coach" element={<InitForm />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/logout" element={<Logout />} />
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
