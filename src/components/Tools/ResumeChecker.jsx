import { Container, Typography } from '@mui/material';

// Placeholder page - no functionality yet, just a distinct route to build on.
export default function ResumeChecker() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Resume Checker
      </Typography>
    </Container>
  );
}
