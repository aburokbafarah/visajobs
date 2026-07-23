import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Stack, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { checkUser, logoutUser } from './Auth/AuthService';
import '../styles/navbar.css';

const TICKER_PHRASES = [
  'H-1B Sponsorship',
  'OPT Friendly',
  'CPT Eligible',
  'Green Card Sponsorship',
  'Remote Friendly',
];

// One "copy" repeats the phrase list several times so it's comfortably
// wider than any realistic viewport - with only 2 copies duplicated back
// to back (see below), the visible window would otherwise run out of
// content and show a blank gap partway through the animation on wide
// screens, well before the seam between the two copies ever scrolls into
// view.
const TICKER_COPY = Array(4).fill(TICKER_PHRASES).flat();
const TICKER_TRACK = [...TICKER_COPY, ...TICKER_COPY];

// NavBar component - navigation bar for the visa jobs app
export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // NavBar is mounted once at the top level and never unmounts (by design,
  // so it persists across navigation), so login/logout elsewhere won't
  // naturally re-render it. Re-derive auth state from the same checkUser()
  // used by ProtectedRoute whenever the route changes - login and logout
  // both navigate in this app, so this reliably catches both without a
  // full page reload.
  const [isLoggedIn, setIsLoggedIn] = useState(() => checkUser());

  useEffect(() => {
    setIsLoggedIn(checkUser());
  }, [location.pathname]);

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

  const handleLogout = () => {
    logoutUser().then(() => {
      setIsLoggedIn(false);
    });
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
              {isLoggedIn ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 99 }}
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ borderRadius: 99 }}
                    onClick={() => navigate('/auth/login')}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 99 }}
                    onClick={() => navigate('/auth/register')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <div className="animationBar">
        <div className="animationBarIn">
          {TICKER_TRACK.map((phrase, index) => (
            <span key={index}>{phrase}</span>
          ))}
        </div>
      </div>
    </>
  );
}