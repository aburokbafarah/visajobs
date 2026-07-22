import { createTheme } from '@mui/material/styles';

// Matches the existing dark-mode CSS variables in src/index.css
// (--accent, --bg, --text-h, --text) so MUI components blend with
// the app's current lavender/purple accent instead of MUI's default blue.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c084fc',
    },
    background: {
      default: '#16171d',
      paper: '#1f2028',
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
    },
  },
});

export default theme;
