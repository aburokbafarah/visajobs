import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';

// displays a single job listing card
// receives one job object as a prop and displays it
export function JobCard({ job }) {
  const visaType = job.get('visaType');
  const jobType = job.get('jobType');

  return (
    <Card variant="outlined">
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
  );
}