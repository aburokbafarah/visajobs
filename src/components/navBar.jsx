import { AppBar, Toolbar, Box, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

// NavBar component - navigation bar for the visa jobs app
export function NavBar() {
  return (
    <Box>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: '#1f2028', borderBottom: '1px solid #2e303a' }}
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
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              px: 2.25,
              py: 1,
              borderRadius: 2,
            }}
          >
            <i className="fa-solid fa-house"></i> VisaJobs
          </Box>

          <Stack direction="row" spacing={3} sx={{ flex: 1, justifyContent: 'center' }}>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/jobs" color="inherit">Jobs</Button>
            <Button component={Link} to="/jobs" color="inherit">Resources</Button>
          </Stack>

          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" color="inherit" sx={{ borderRadius: 99 }}>Log In</Button>
            <Button variant="contained" color="primary" sx={{ borderRadius: 99 }}>Sign Up</Button>
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
    </Box>
  );
}