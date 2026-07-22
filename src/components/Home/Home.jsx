import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { logoutUser } from '../Auth/AuthService';

// Scrolls to another section on the single-page layout (Home is always
// rendered inside MainPage, so the target sections are always on the page).
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// Home page component - full-height hero section
export default function Home() {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    logoutUser().then(() => {
      navigate('/auth');
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Button
        variant="text"
        color="inherit"
        onClick={handleLogout}
        sx={{ position: 'absolute', top: 24, right: 24 }}
      >
        Log Out
      </Button>

      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{ mb: 2, fontWeight: 700, fontFamily: 'Pacifico, cursive' }}
        >
          Sponsify.
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mb: 5, fontWeight: 300, color: 'text.secondary' }}
        >
          Find jobs that offer visa sponsorship for international students.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => scrollToSection('jobs')}
          >
            Browse Jobs
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => scrollToSection('resources')}
          >
            Learn More
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
