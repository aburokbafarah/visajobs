import { createTheme } from '@mui/material/styles';

// Light theme - matches the light-mode CSS variables in src/index.css
// (--accent, --bg, --text-h, --text) with a blue accent.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
});

export default theme;
