import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 6, width: '100%' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Wanderon
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Secure User Authentication System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            A modern authentication system built with React, Node.js, and MongoDB
          </Typography>

          {isAuthenticated ? (
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{ mr: 2 }}
              >
                Go to Dashboard
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{ mr: 2 }}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
