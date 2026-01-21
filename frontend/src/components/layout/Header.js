import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha,
  Divider,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Logout,
  Person,
  Close,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: { xs: 1, md: 0 },
            cursor: 'pointer',
            fontWeight: 700,
            mr: { md: 4 },
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          onClick={() => navigate('/')}
        >
          AuthApp
        </Typography>

        {isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated && (
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: alpha(theme.palette.common.white, 0.2),
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <IconButton
              color="inherit"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{
                bgcolor: alpha(theme.palette.common.white, 0.1),
                '&:hover': {
                  bgcolor: alpha(theme.palette.common.white, 0.2),
                },
              }}
            >
              {mobileMenuOpen ? <Close /> : <MenuIcon />}
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/dashboard')}
                  startIcon={<Dashboard />}
                  sx={{
                    bgcolor: alpha(theme.palette.common.white, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                    },
                  }}
                >
                  Dashboard
                </Button>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.common.white, 0.1),
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                    },
                  }}
                  onClick={handleMenuOpen}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user?.username}
                  </Typography>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      borderRadius: 2,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                    <Person sx={{ mr: 2, fontSize: 20 }} />
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 2, fontSize: 20 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{
                    bgcolor: alpha(theme.palette.common.white, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                    },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.common.white, 0.9),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <Box
          sx={{
            px: 2,
            pb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            pt: 2,
          }}
        >
          {isAuthenticated ? (
            <>
              <Button
                fullWidth
                color="inherit"
                onClick={() => { navigate('/dashboard'); handleMenuClose(); }}
                startIcon={<Dashboard />}
                sx={{
                  justifyContent: 'flex-start',
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.2),
                  },
                }}
              >
                Dashboard
              </Button>
              <Button
                fullWidth
                color="inherit"
                onClick={handleLogout}
                startIcon={<Logout />}
                sx={{
                  justifyContent: 'flex-start',
                  bgcolor: alpha(theme.palette.error.main, 0.2),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.error.main, 0.3),
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                fullWidth
                color="inherit"
                onClick={() => { navigate('/login'); handleMenuClose(); }}
                sx={{
                  justifyContent: 'flex-start',
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.2),
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => { navigate('/register'); handleMenuClose(); }}
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.9),
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
