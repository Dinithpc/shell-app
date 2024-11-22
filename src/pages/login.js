import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import Image from 'next/image';
import TemporaryDrawer from '@/components/TemporaryDrawer';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Replace this with your actual authentication logic
    if (username === 'admin' && password === 'sino@2%24') {
      localStorage.setItem('token', 'your_jwt_token'); // Replace with actual token
      router.push('/'); // Redirect to home or protected page
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <>
    {/* <TemporaryDrawer/> */}
    <Grid container component="main" sx={{ height: '100vh', p: 5, backgroundColor: '#F8F8F8' }}>
      {/* Left Column with Image and Text */}
      <Grid
        item
        xs={12}
        sm={7}
        sx={{
          position: 'relative',
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/solar.svg)', // Replace with your image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 144, 248, 0.8)',
            borderRadius: 2,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            padding: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src="/logo-white.svg" alt="Logo" style={{ width: 50, height: 50 }} />
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              marginLeft: 1,
              fontWeight: 400,
              fontSize: '18px',
            }}
          >
            www.soaravg.com
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 16,
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 400,
              fontSize: { xs: '16px', md: '20px' },
            }}
          >
            Solar Projects Monitoring System
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '24px', md: '40px' },
            }}
          >
            Uniqueness of the <br /> Solar Projects Inspection
          </Typography>
        </Box>
      </Grid>

      {/* Right Column for Login Form */}
      <Grid item xs={12} sm={5}>
        <Box
          sx={{
            my: 'auto',
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'nowrap' }}>
            <img src="/blue-logo.svg" alt="Soar Studio" style={{ width: 72, flexShrink: 0 }} />
            <Box sx={{ ml: 2, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Typography
                variant="h5"
                sx={{ color: '#0090F8', fontSize: { xs: '20px', md: '38px' }, fontWeight: 600 }}
              >
                Soar Studio
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: '#222F3E', fontSize: { xs: '14px', md: '16px' }, fontWeight: 400, mt: 0 }}
              >
                Ultimate Security Provider
              </Typography>
            </Box>
          </Box>

          <Typography component="h1" variant="h5" sx={{ mb: 2, fontSize: { xs: '14px', md: '20px' }, fontWeight: 400 }}>
            Login to your account.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              placeholder="User Name"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Added onChange
            />

            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Added onChange
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
              <Typography variant="body2" sx={{ cursor: 'pointer', color: '#0090F8' }}>
                Forgot Password?
              </Typography>
            </Box>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#0090F8', mt: 3 }}
            >
              Login
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Don’t have an account? Sign Up
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default Login;
