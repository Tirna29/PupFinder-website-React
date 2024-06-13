import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box } from '@mui/material';
import Login from '../components/Login';
import { login } from '../api';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (name, email) => {
    try {
      await login(name, email);
      navigate('/search');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <Box mt={2}>
          <Login onLogin={handleLogin} />
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
