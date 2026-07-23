import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Same dialog styling as the Saved Jobs logged-out state (title + message +
// top-right close button) - reused wherever a logged-out user clicks
// something that requires an account.
export function LoginRequiredDialog({ open, onClose, toolName }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        aria-label="Close"
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          {toolName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Log in to use {toolName}.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
