import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';

// Scrolls to another section on the single-page layout (Home is always
// rendered inside MainPage, so the target sections are always on the page).
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// One continuous line-art skyline strip, drawn left-to-right along a shared
// groundline: city blocks, a lattice tower, an obelisk, a pyramid, more city
// blocks, then a plane with a trailing flight path and a couple of cloud
// doodles above. All generic/simplified silhouettes, not replicas of any
// specific real monument. Single stroke-only composition, one stroke width.
const SkylineIllustration = (props) => (
  <svg
    viewBox="0 0 1200 200"
    preserveAspectRatio="xMidYMax meet"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* shared groundline connecting the whole scene */}
    <line x1="20" y1="170" x2="1180" y2="170" />

    {/* left city block cluster */}
    <rect x="40" y="115" width="26" height="55" />
    <rect x="72" y="85" width="32" height="85" />
    <rect x="110" y="130" width="24" height="40" />
    <rect x="140" y="100" width="28" height="70" />

    {/* generic lattice tower */}
    <path d="M260 170 L292 40 L296 25 L300 40 L332 170" />
    <line x1="272" y1="110" x2="320" y2="110" />
    <line x1="280" y1="140" x2="312" y2="140" />

    {/* generic obelisk */}
    <path d="M388 170 L388 65 L400 45 L412 65 L412 170" />

    {/* generic pyramid */}
    <path d="M460 170 L510 70 L560 170 Z" />
    <line x1="510" y1="70" x2="510" y2="170" />

    {/* right city block cluster */}
    <rect x="620" y="110" width="30" height="60" />
    <rect x="658" y="75" width="24" height="95" />
    <rect x="690" y="125" width="34" height="45" />
    <rect x="732" y="95" width="26" height="75" />
    <rect x="766" y="115" width="30" height="55" />

    {/* cloud doodles */}
    <g>
      <circle cx="175" cy="35" r="10" />
      <circle cx="192" cy="26" r="13" />
      <circle cx="210" cy="35" r="10" />
      <line x1="163" y1="42" x2="222" y2="42" />
    </g>
    <g>
      <circle cx="575" cy="28" r="8" />
      <circle cx="588" cy="22" r="10" />
      <circle cx="602" cy="28" r="8" />
      <line x1="566" y1="34" x2="610" y2="34" />
    </g>

    {/* plane with a trailing dashed flight path back toward the skyline */}
    <path d="M830 90 Q900 60 980 45" strokeDasharray="6 8" />
    <path d="M980 45 L1050 20 L1010 55 L1025 65 L980 45Z" />
  </svg>
);

// Home page component - full-height hero section
export default function Home() {
  return (
    <Box
      sx={{
        position: 'relative',
        // NavBar (65px) + marquee (62px) = 127px measured above the hero;
        // fitting the hero to the remaining space (rather than a full extra
        // 100vh stacked below them) is what lets the composition center
        // within the first visible screen instead of needing a scroll.
        minHeight: { xs: 'auto', sm: 'calc(100vh - 127px)' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 5, sm: 3 },
      }}
    >
      {/* Decorative background illustration - purely visual, hidden from a11y tree.
          Positioned independently of the text (fixed offset from the hero's
          own top) so nudging the text block doesn't drag this along too. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '360px',
          left: '50%',
          width: '100vw',
          transform: 'translateX(-50%)',
          zIndex: 0,
          pointerEvents: 'none',
          color: (theme) => alpha(theme.palette.primary.main, 0.35),
        }}
      >
        <SkylineIllustration style={{ width: '100%', height: 'auto' }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', mt: '-190px' }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontFamily: 'Pacifico, cursive',
          }}
        >
          Sponsify.
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mb: 3, fontWeight: 300, color: 'text.secondary' }}
        >
          Find jobs that offer visa sponsorship for international students.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'center' }}
        >
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
