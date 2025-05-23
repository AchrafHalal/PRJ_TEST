import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Alert,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.user || res.data;
        setUserData(user);
        console.log("user", user);
        setLocation(user.location || "");
        setBio(user.bio || "");
      } catch (err) {
        setMessage({ type: "error", text: "Failed to fetch user info." });
        console.error(err);
      }
    })();
  }, [token]);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/profileInfo`,
        { location, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: "success", text: "Profile updated successfully." });
      setEditMode(false);
      setUserData((u) => ({ ...u, location, bio }));
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update profile." });
    }
  };

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const res = await axios.put(
        "http://localhost:8000/api/profileInfo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage({ type: "success", text: "Avatar uploaded!" });
      setUserData((u) => ({ ...u, image: res.data.user.image }));
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to upload avatar." });
    }
  };

  if (!userData) return null;

  const progress = 60;
  const profileSteps = [
    { label: "Setup account", completed: true },
    { label: "Upload your photo", completed: !!userData.image },
    { label: "Personal info", completed: true },
    { label: "Location", completed: !!location },
    { label: "Biography", completed: !!bio },
    { label: "Notifications", completed: false },
    { label: "Bank details", completed: false },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      {isSmallScreen && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Profile Completion: {progress}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 10, borderRadius: 5 }}
            color={progress === 100 ? "success" : "primary"}
          />
        </Paper>
      )}

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} lg={8}>
          {/* Profile Image Upload */}
          <Paper sx={{ display: "flex", p: 4, mb: 3 }}>
            <Avatar
              alt="User"
              src={
                userData.image
                  ? `http://localhost:8000/storage/${userData.image}`
                  : "/default-avatar.png"
              }
              sx={{ width: 100, height: 100, mr: 4 }}
            />
            <Box>
              <Button variant="outlined" component="label" size="small">
                Choose Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ ml: 2 }}
                onClick={handleUpload}
                disabled={!selectedImage}
              >
                Upload
              </Button>
              <Typography variant="body2" color="text.secondary" mt={1}>
                At least 800×800 px recommended. JPG or PNG is allowed.
              </Typography>
            </Box>
          </Paper>

          {/* Personal Info */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Personal Info</Typography>
              <IconButton onClick={() => navigate(`/editInfo/${userData.id}`)}>
                <EditIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography>
                  {userData.firstName} {userData.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography>{userData.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
                <Typography>{userData.phone || "-"}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Location & Bio */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Location & Bio</Typography>
              {!editMode ? (
                <IconButton onClick={() => setEditMode(true)}>
                  <EditIcon />
                </IconButton>
              ) : (
                <Box>
                  <Button color="inherit" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSave}>
                    Save changes
                  </Button>
                </Box>
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
            {editMode ? (
              <>
                <TextField
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  label="Location"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  label="Bio"
                  multiline
                  rows={3}
                />
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">
                  Location
                </Typography>
                <Typography>{location || "-"}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Bio
                </Typography>
                <Typography>{bio || "-"}</Typography>
              </>
            )}
          </Paper>
        </Grid>

        {/* Right Section (Progress) */}
        <Grid item xs={12} lg={4}>
          {!isSmallScreen && (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Complete your profile
              </Typography>
              <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={100}
                  thickness={5}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{`${progress}%`}</Typography>
                </Box>
              </Box>

              <Box mt={2} textAlign="left">
                {profileSteps.map((step, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 0.5,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      {step.completed ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <CancelIcon color="disabled" fontSize="small" />
                      )}
                      <Typography variant="body2">{step.label}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
