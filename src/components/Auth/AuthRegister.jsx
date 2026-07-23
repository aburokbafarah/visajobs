import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { createUser, checkUser } from './AuthService';
import AuthForm from './AuthForm';

// Register component  
const AuthRegister = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
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

  // Create user when add flag is true
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(`${userCreated.get('firstName')}, you successfully registered!`);
          navigate('/');
        }
        setAdd(false);
      });
    }
  }, [newUser, add, navigate]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({ ...newUser, [name]: newValue });
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
          Sign Up
        </Typography>
        <AuthForm
          user={newUser}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
          isLogin={false}
        />
      </Paper>
    </Box>
  );
};

export default AuthRegister;