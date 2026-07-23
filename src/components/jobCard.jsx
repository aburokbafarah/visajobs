import { useState } from 'react';
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import { JobDetailDialog } from './JobDetailDialog';
import { SaveToListControl } from './SaveToListControl';

const highlightFade = keyframes`
  from { background-color: var(--job-card-highlight-color); }
  to { background-color: transparent; }
`;

// displays a single job listing card
// receives one job object as a prop and displays it
// `highlight` briefly fades the card's background in, used to call out jobs
// that just arrived via the LiveQuery real-time subscription (see Jobs.jsx)
export function JobCard({ job, highlight = false }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const theme = useTheme();

  const visaType = job.get('sponsorship');
  const jobType = job.get('jobType');

  return (
    <>
      <Card
        variant="outlined"
        onClick={() => setDetailOpen(true)}
        sx={{
          cursor: 'pointer',
          '--job-card-highlight-color': alpha(theme.palette.primary.main, 0.18),
          ...(highlight && { animation: `${highlightFade} 1.6s ease-out` }),
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {job.get('title')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {job.get('company')} · {job.get('location')}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            {visaType && <Chip label={visaType} color="primary" size="small" />}
            {jobType && <Chip label={jobType} variant="outlined" size="small" />}
          </Stack>

          <Typography variant="body2" sx={{ mb: 1 }}>
            {job.get('salary')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.get('description')}
          </Typography>
        </CardContent>
      </Card>

      <JobDetailDialog
        job={job}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        saveToListSlot={<SaveToListControl job={job} />}
      />
    </>
  );
}