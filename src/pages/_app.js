// pages/_app.js

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, CssBaseline, Drawer, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Adjust import path
import withAuth from '@/utils/withAuth';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const MyApp = ({ Component, pageProps, isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    router.push('/login');
    window.location.reload();
    // redirect to login or home page after logout
  };

  return (
    <>
      {isAuthenticated && (
        <Box sx={{ display: 'flex' }}>
          {/* AppBar with Profile Icon and Admin text */}
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
            <img src="/logo-white.svg" alt="Logo" style={{ width: 30, height: 30 , marginRight:7}} />
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontSize: { xs: '20px', md: '22px' }, fontWeight: 600 }}>
              Soar Studio
              </Typography>
              
              {/* Profile section on the right */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  Admin
                </Typography>
                <IconButton onClick={handleProfileClick} color="inherit">
                  <Avatar />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Sidebar - Static Navigation Items */}
          <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                mt: '20px',  // Adding margin-top to the paper element
                },
            }}
            >
            {/* Wrapping Sidebar in a Box to apply top margin */}
            <Box sx={{ mt: '60px' }}>
                <Sidebar />
            </Box>
            </Drawer>

          {/* Main Content Area */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              mt: 8, // Offset for the AppBar height
            }}
          >
            <Component {...pageProps} />
          </Box>
        </Box>
      )}
      {!isAuthenticated && <Component {...pageProps} />}
    </>
  );
};

export default withAuth(MyApp);
