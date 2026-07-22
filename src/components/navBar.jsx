import { AppBar, Toolbar, Box, Stack, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

// NavBar component - navigation bar for the visa jobs app
export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Home/Jobs/Resources scroll to a section on the single-page layout
  // instead of navigating to a separate route. If we're not already on
  // that page (e.g. on /auth), navigate there first with a hash so
  // MainPage can scroll to it once it mounts.
  const scrollToSection = (id) => (event) => {
    event.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          color: '#0f172a',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: '#fff',
              fontWeight: 700,
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              px: 2.25,
              py: 1,
              borderRadius: 2,
            }}
          >
            <i className="fa-solid fa-house"></i> Sponsify
          </Box>

          <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={4}>
              <Button onClick={scrollToSection('home')} color="inherit">Home</Button>
              <Button onClick={scrollToSection('jobs')} color="inherit">Jobs</Button>
              <Button onClick={scrollToSection('resources')} color="inherit">Resources</Button>
            </Stack>

            <Stack direction="row" spacing={1.5}>
              <Button variant="outlined" color="inherit" sx={{ borderRadius: 99 }}>Log In</Button>
              <Button variant="contained" color="primary" sx={{ borderRadius: 99 }}>Sign Up</Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <div className="animationBar">
        <div className="animationBarIn">
          <span>H-1B Sponsorship</span>
          <span>OPT Friendly</span>
          <span>CPT Eligible</span>
          <span>Green Card Sponsorship</span>
          <span>Remote Friendly</span>
          <span>H-1B Sponsorship</span>
          <span>OPT Friendly</span>
          <span>CPT Eligible</span>
          <span>Green Card Sponsorship</span>
          <span>Remote Friendly</span>
        </div>
      </div>
    </>
  );
}