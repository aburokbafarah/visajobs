import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { loginUser, checkUser } from './AuthService';
import AuthForm from './AuthForm';

// Login component
const AuthLogin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [add, setAdd] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (checkUser()) {
      alert('You are already logged in!');
      navigate('/');
    }
  }, [navigate]);

  // Login user when add flag is true
  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((loggedIn) => {
        if (loggedIn) {
          alert(`Welcome back, ${loggedIn.get('firstName')}!`);
          navigate('/');
        }
        setAdd(false);
      });
    }
  }, [currentUser, add, navigate]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setCurrentUser({ ...currentUser, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f6ff',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 4, sm: 5 },
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          Login
        </Typography>
        <AuthForm
          user={currentUser}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
          isLogin={true}
        />
      </Paper>
    </Box>
  );
};

export default AuthLogin;