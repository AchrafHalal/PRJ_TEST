import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import { Avatar, Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import FlagIcon from "@mui/icons-material/Flag";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({ open, handleDrawerClose, user }) {
  const userName = user?.profile?.user?.firstName || "User";
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Add Transaction",
      icon: <AttachMoneyIcon />,
      path: "/add-transaction",
    },
    { text: "Transactions", icon: <ListAltIcon />, path: "/transactions" },
    { text: "Reports", icon: <PieChartOutlineIcon />, path: "/reports" },
    { text: "Goals & Budgets", icon: <FlagIcon />, path: "/goals" },
    { text: "AI Coach", icon: <SmartToyIcon />, path: "/coach" },
    { text: "Settings", icon: <SettingsOutlinedIcon />, path: "/settings" },
  ];

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      {/* Normal menu items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <Tooltip title={open ? "" : item.text} placement="left">
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor:
                    location.pathname === item.path
                      ? theme.palette.mode === "dark"
                        ? grey[800]
                        : grey[300]
                      : null,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          py: 2,
          justifyContent: open ? "flex-start" : "center",
          px: open ? 2.5 : 0,
        }}
      >
        <Tooltip title={open ? "" : userName || "Profile"} placement="left">
          <ListItemButton
            onClick={() => navigate("/profile")}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt={user?.firstName || "User"}
                src={user?.image}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid white",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={userName || "User"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </Tooltip>
      </Box>

      <Divider />

      {/* Logout Button */}
      <List
        sx={{
          display: "flex",
          justifyContent: open ? "flex-start" : "center",
          px: open ? 2.5 : 0,
        }}
      >
        <Tooltip title="Logout" placement="left">
          <ListItemButton
            onClick={() => document.getElementById("logout-icon").click()}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <span id="logout-icon">
                <LogoutButton asIcon={true} />
              </span>
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </Tooltip>
      </List>
    </StyledDrawer>
  );
}
