import React, { useState } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  Badge,
  Popover,
  MenuItem,
  Tooltip,
  Menu,
  ListItemText,
} from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: "fixed",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function TopBar({
  open,
  handleDrawerOpen,
  setMode,
  style,
  notifications,
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const toggleMode = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    localStorage.setItem("currentMode", newMode);
    setMode(newMode);
  };

  const handleRedirectToUsers = () => {
    navigate("/users");
    handleNotificationClose();
  };

  return (
    <AppBar position="fixed" open={open} style={style}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
         
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box flexGrow={1} />

        <Stack direction="row" spacing={1}>
          <IconButton onClick={toggleMode} color="inherit">
            {theme.palette.mode === "light" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge
              badgeContent={notifications?.length || 0}
              color="secondary"
              variant="dot"
            >
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>

          <Popover
            id="notification-popover"
            open={Boolean(notificationAnchorEl)}
            anchorEl={notificationAnchorEl}
            onClose={handleNotificationClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {notifications?.length ? (
              notifications.map((notif, index) => (
                <MenuItem key={index} onClick={handleRedirectToUsers}>
                  {notif.message || notif.data?.message || "New notification"}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No new notifications</MenuItem>
            )}
          </Popover>

          <IconButton color="inherit">
            <SettingsOutlinedIcon />
          </IconButton>

          <Tooltip title="Account">
            <IconButton
              size="large"
              aria-label="user account"
              aria-controls="logout-menu"
              aria-haspopup="true"
              onClick={handleAccountMenuOpen}
              color="inherit"
            >
              <Person2OutlinedIcon />
            </IconButton>
          </Tooltip>

          <Menu
            id="logout-menu"
            anchorEl={accountAnchorEl}
            open={Boolean(accountAnchorEl)}
            onClose={handleAccountMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile");
                handleAccountMenuClose();
              }}
            >
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleAccountMenuClose();
                localStorage.removeItem("token"); 
                navigate("/login"); 
              }}
            >
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
