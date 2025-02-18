import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, CircularProgress, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const userResponse = await axios.get("http://localhost:8080/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userResponse.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to load user info.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/auth/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage("Password changed successfully!");
      // alert('Password Changed successfully')
      setError(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      setTimeout(() => {
        navigate('/tasks')
      }, 2000)
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Failed to change password.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="info" />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="70%" padding='20px'>
      <Box 
        component="form"
        onSubmit={handlePasswordChange}
        sx={{ 
          width: '70%', 
          padding: 3, 
          display: "flex", 
          flexDirection: "column", 
          gap: 2, 
          borderRadius: 2, 
          boxShadow: 2, 
          background: 'white'
        }}
      >
        <Typography variant="h5" color="primary" textAlign="center">
          My Info
        </Typography>
        
        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        {user ? (
          <>
            <TextField label="First Name" value={user.first_name} InputProps={{ readOnly: true }} />
            <TextField label="Middle Name" value={user.middle_name || "N/A"} InputProps={{ readOnly: true }} />
            <TextField label="Last Name" value={user.last_name} InputProps={{ readOnly: true }} />
            <TextField label="Date of Birth" value={user.dob} InputProps={{ readOnly: true }} />
            <TextField label="Gender" value={user.gender} InputProps={{ readOnly: true }} />
            <TextField label="Address" value={user.address} InputProps={{ readOnly: true }} />
            <TextField label="Email" value={user.email} InputProps={{ readOnly: true }} />

            <Typography variant="h6" color="primary">
              Change Password
            </Typography>
            <TextField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />

            <Button variant="contained" color="primary" type="submit">
              Update Password
            </Button>
          </>
        ) : (
          <Typography color="error" textAlign="center">
            No user data found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyInfo;
