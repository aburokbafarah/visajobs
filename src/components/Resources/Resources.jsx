import { Container, Typography, Box, Paper } from '@mui/material';

// Placeholder resource content - no Resources page existed before this;
// the NavBar link previously pointed at /jobs by mistake (see restructure notes).
const RESOURCES = [
  {
    title: 'H-1B Visa Guide',
    description: 'Understand the H-1B sponsorship process, timeline, and lottery.',
  },
  {
    title: 'OPT & CPT FAQ',
    description: 'Common questions about OPT and CPT work authorization for students.',
  },
  {
    title: 'Resume & Cover Letter Tips',
    description: 'Guidance for crafting applications that stand out to sponsoring employers.',
  },
];

export default function Resources() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Resources
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 1, fontWeight: 300, color: 'primary.main' }}
        >
          Guides and tools to support your job search
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {RESOURCES.map((resource) => (
          <Paper
            key={resource.title}
            variant="outlined"
            sx={{ p: 2.5, flex: '1 1 260px' }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>{resource.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {resource.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
