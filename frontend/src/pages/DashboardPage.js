import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  alpha,
  Divider,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Person,
  Email,
  Security,
  Logout,
  CheckCircle,
  TrendingUp,
  VerifiedUser,
} from '@mui/icons-material';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const stats = [
    {
      title: 'Account Status',
      value: 'Active',
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    {
      title: 'Security Level',
      value: 'High',
      icon: <Security sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
    {
      title: 'Profile Complete',
      value: '100%',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Paper
              elevation={8}
              sx={{
                p: { xs: 3, md: 4 },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontWeight: 700,
                    }}
                  >
                    {user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 200 }}>
                    <Typography
                      variant={isMobile ? 'h4' : 'h3'}
                      sx={{ fontWeight: 700, mb: 0.5 }}
                    >
                      Welcome back, {user?.username}!
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Here's what's happening with your account today
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                    startIcon={<Logout />}
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      color: 'white',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.common.white, 0.3),
                      },
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Grow in timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${alpha(stat.color, 0.3)}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: stat.bgColor,
                          color: stat.color,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Chip
                        label={stat.value}
                        color="primary"
                        sx={{
                          bgcolor: stat.bgColor,
                          color: stat.color,
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Account Information */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Fade in timeout={1200}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <VerifiedUser
                      sx={{
                        fontSize: 32,
                        color: theme.palette.primary.main,
                        mr: 2,
                      }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Account Information
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Person
                            sx={{
                              fontSize: 20,
                              color: theme.palette.primary.main,
                              mr: 1,
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Username
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {user?.username}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.secondary.main, 0.05),
                          border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Email
                            sx={{
                              fontSize: 20,
                              color: theme.palette.secondary.main,
                              mr: 1,
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Email Address
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {user?.email}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade in timeout={1400}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<DashboardIcon />}
                      sx={{ justifyContent: 'flex-start', py: 1.5 }}
                    >
                      View Dashboard
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Person />}
                      sx={{ justifyContent: 'flex-start', py: 1.5 }}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Security />}
                      sx={{ justifyContent: 'flex-start', py: 1.5 }}
                    >
                      Security Settings
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
