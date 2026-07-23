import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkUser } from './AuthService';

// Auth module
const AuthModule = () => {
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (checkUser()) {
      alert('You are already logged in!');
      navigate('/');
    }
  }, [navigate]);

  return <div />;
};

export default AuthModule;