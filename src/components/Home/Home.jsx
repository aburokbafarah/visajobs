import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { logoutUser } from '../Auth/AuthService';

// Home page component
export default function Home() {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    logoutUser().then(() => {
      navigate('/auth');
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>Welcome to Visa Jobs</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Find jobs that offer visa sponsorship for international students.
      </Typography>
      <Button variant="outlined" onClick={handleLogout}>Log Out</Button>
    </Container>
  );
}