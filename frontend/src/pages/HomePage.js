import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Security, 
  Speed, 
  Lock, 
  Dashboard as DashboardIcon,
  RocketLaunch,
  CheckCircle
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Authentication',
      description: 'Industry-standard JWT tokens and password hashing for maximum security',
      color: theme.palette.primary.main,
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Lightning Fast',
      description: 'Optimized performance with React and modern backend architecture',
      color: theme.palette.secondary.main,
    },
    {
      icon: <Lock sx={{ fontSize: 40 }} />,
      title: 'Protected Routes',
      description: 'Secure access control with protected routes and session management',
      color: theme.palette.success.main,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'pulse 8s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.5 },
            '50%': { opacity: 0.8 },
          },
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 8, color: 'white' }}>
            <Grow in timeout={1500}>
              <Box>
                <RocketLaunch sx={{ fontSize: { xs: 60, md: 80 }, mb: 2, opacity: 0.9 }} />
                <Typography 
                  variant={isMobile ? 'h3' : 'h1'} 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 800,
                    textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                    mb: 2
                  }}
                >
                  Welcome to AuthApp
                </Typography>
                <Typography 
                  variant={isMobile ? 'h6' : 'h4'} 
                  sx={{ 
                    mb: 3,
                    opacity: 0.95,
                    fontWeight: 300,
                    maxWidth: '800px',
                    mx: 'auto'
                  }}
                >
                  Modern Authentication System
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4,
                    opacity: 0.9,
                    maxWidth: '600px',
                    mx: 'auto',
                    fontSize: { xs: '1rem', md: '1.125rem' }
                  }}
                >
                  Built with React, Node.js, and MongoDB. Experience secure, fast, and scalable authentication.
                </Typography>

                {isAuthenticated ? (
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/dashboard')}
                      startIcon={<DashboardIcon />}
                      sx={{ 
                        bgcolor: 'white',
                        color: theme.palette.primary.main,
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.common.white, 0.9),
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        },
                      }}
                    >
                      Go to Dashboard
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{ 
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: alpha(theme.palette.common.white, 0.1),
                          borderWidth: 2,
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{ 
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: alpha(theme.palette.common.white, 0.1),
                          borderWidth: 2,
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </Box>
                )}
              </Box>
            </Grow>
          </Box>
        </Fade>

        {/* Features Section */}
        <Box sx={{ mt: 10 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 6, 
              color: 'white',
              fontWeight: 700,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      background: alpha(theme.palette.common.white, 0.95),
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: `0 20px 40px ${alpha(feature.color, 0.3)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: 3,
                          bgcolor: alpha(feature.color, 0.1),
                          color: feature.color,
                          mb: 2,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Grid container spacing={4}>
            {[
              { label: 'Security', value: '100%' },
              { label: 'Uptime', value: '99.9%' },
              { label: 'Speed', value: '<100ms' },
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Fade in timeout={1500 + index * 200}>
                  <Box sx={{ color: 'white' }}>
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
