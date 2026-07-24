import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { alpha } from '@mui/material/styles';
import Parse from 'parse';
import { SavedJobs } from './SavedJobs';
import { AlertSettings } from './AlertSettings';
import { LoginRequiredDialog } from './LoginRequiredDialog';

const AI_TOOLS = [
  { name: 'Resume Checker', path: '/tools/resume-checker' },
  { name: 'Visa Advisor', path: '/tools/visa-advisor' },
  { name: 'Cover Letter Generator', path: '/tools/cover-letter-generator' },
];

// Shared clickable-list-item styling for both the AI Tools placeholders and
// the Saved Jobs entry below them, so they read as one consistent group of
// actions - blue-tinted like the rest of the app's links, with a hover tint
// and trailing chevron signaling "this leads somewhere".
const toolButtonSx = {
  justifyContent: 'space-between',
  textTransform: 'none',
  fontWeight: 600,
  color: 'primary.main',
  borderRadius: 2,
  px: 2,
  py: 1.25,
  transition: 'background-color 0.2s ease, color 0.2s ease',
  '& .MuiButton-endIcon': {
    transition: 'transform 0.2s ease',
  },
  '&:hover': {
    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
    color: 'primary.dark',
    '& .MuiButton-endIcon': {
      transform: 'translateX(2px)',
    },
  },
};

// ai tools sidebar component
// provides ai powered tools for international students, plus the entry
// point into the user's saved job lists
export function AiTools() {
  const navigate = useNavigate();
  const [savedJobsOpen, setSavedJobsOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [loginPromptTool, setLoginPromptTool] = useState(null);

  const handleToolClick = (tool) => {
    if (Parse.User.current()) {
      navigate(tool.path);
    } else {
      setLoginPromptTool(tool.name);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        AI Tools
      </Typography>
      <Stack spacing={2}>
        {AI_TOOLS.map((tool) => (
          <Button
            key={tool.name}
            onClick={() => handleToolClick(tool)}
            endIcon={<ChevronRightIcon fontSize="small" />}
            sx={toolButtonSx}
          >
            {tool.name}
          </Button>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack spacing={2}>
        <Button
          onClick={() => setSavedJobsOpen(true)}
          endIcon={<ChevronRightIcon fontSize="small" />}
          sx={toolButtonSx}
        >
          Saved Jobs
        </Button>
        <Button
          onClick={() => setAlertsOpen(true)}
          endIcon={<ChevronRightIcon fontSize="small" />}
          sx={toolButtonSx}
        >
          Job Alerts
        </Button>
      </Stack>

      <Dialog
        open={savedJobsOpen}
        onClose={() => setSavedJobsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <IconButton
          onClick={() => setSavedJobsOpen(false)}
          aria-label="Close"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ pt: 5 }}>
          <SavedJobs />
        </DialogContent>
      </Dialog>

      <Dialog
        open={alertsOpen}
        onClose={() => setAlertsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <IconButton
          onClick={() => setAlertsOpen(false)}
          aria-label="Close"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ pt: 5 }}>
          <AlertSettings />
        </DialogContent>
      </Dialog>

      <LoginRequiredDialog
        open={!!loginPromptTool}
        onClose={() => setLoginPromptTool(null)}
        toolName={loginPromptTool || ''}
      />
    </Box>
  );
}
