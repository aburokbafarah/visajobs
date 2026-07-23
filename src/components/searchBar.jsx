import { Box, TextField, Button } from '@mui/material';

// search bar component for filtering jobs
// allows users to search by keyword

export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        variant="outlined"
        size="medium"
        placeholder="Job title, skill or company..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ flex: 1 }}
      />
      {/* Clear button resets search */}
      <Button
        variant="text"
        size="small"
        onClick={() => setSearchTerm('')}
      >
        Clear
      </Button>
    </Box>
  );
}
