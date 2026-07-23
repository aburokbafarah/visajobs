import { Container, Typography } from '@mui/material';

// Placeholder page - no functionality yet, just a distinct route to build on.
export default function CoverLetterGenerator() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Cover Letter Generator
      </Typography>
    </Container>
  );
}
