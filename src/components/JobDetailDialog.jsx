import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Chip,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Full detail view for a single job, shown as a modal so the user stays
// in context of the job list instead of navigating to a new page.
export function JobDetailDialog({ job, open, onClose, saveToListSlot }) {
  if (!job) return null;

  const visaType = job.get('sponsorship');
  const jobType = job.get('jobType');
  const visaSponsorship = job.get('visaSponsorship');

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
        <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
          {job.get('title')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          {job.get('company')} · {job.get('location')}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', rowGap: 1 }}>
          {visaType && <Chip label={visaType} color="primary" size="small" />}
          {jobType && <Chip label={jobType} variant="outlined" size="small" />}
          {visaSponsorship && (
            <Chip label="Sponsors Visa" color="success" variant="outlined" size="small" />
          )}
        </Stack>

        <Box sx={{ mb: 2.5 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Salary
          </Typography>
          <Typography variant="body1">{job.get('salary')}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Description
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {job.get('description')}
          </Typography>
        </Box>

        {/* Part 2: "Save to List" action lives here */}
        {saveToListSlot && (
          <>
            <Divider sx={{ mb: 2.5 }} />
            {saveToListSlot}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
