import { useEffect } from 'react';
import { Box } from '@mui/material';
import Home from '../Home/Home';
import Jobs from '../Jobs/Jobs';
import Resources from '../Resources/Resources';

// Single scrolling page combining what used to be separate Home/Jobs
// routes, plus a new Resources section. NavBar links scroll to these
// section ids instead of navigating to a new route.
export default function MainPage() {
  // If we arrived via a hash (e.g. NavBar navigated here from /auth),
  // scroll to that section once the page has rendered.
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
      }
    }
  }, []);

  // Offsets scrollIntoView/hash-jump targets below the sticky AppBar
  // (~65px tall; the marquee below it is no longer sticky) so section
  // headers don't land hidden underneath it.
  const sectionSx = { scrollMarginTop: '80px' };

  return (
    <Box>
      <Box component="section" id="home" sx={sectionSx}>
        <Home />
      </Box>
      <Box
        component="section"
        id="jobs"
        sx={{ ...sectionSx, backgroundColor: '#f0f6ff' }}
      >
        <Jobs />
      </Box>
      <Box
        component="section"
        id="resources"
        sx={{ ...sectionSx, backgroundColor: '#f5f3ff' }}
      >
        <Resources />
      </Box>
    </Box>
  );
}
