import React from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Welcome, {user?.username}!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You have successfully logged in to your account.
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Username:</strong> {user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {user?.email}
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
