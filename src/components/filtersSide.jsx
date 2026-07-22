import {
  Autocomplete,
  TextField,
  Paper,
  Box,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const VISA_TYPE_OPTIONS = ['H-1B', 'OPT', 'CPT'];

// filters sidebar component
// allows users to filter jobs by type and field
export function FiltersSide({ selectedVisaTypes, setSelectedVisaTypes }) {
  return (
    <Paper
      variant="outlined"
      sx={{ width: 280, flexShrink: 0, p: 2.5 }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Visa Type</Typography>
        <Autocomplete
          multiple
          size="small"
          options={VISA_TYPE_OPTIONS}
          value={selectedVisaTypes}
          onChange={(event, newValue) => setSelectedVisaTypes(newValue)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select visa types" />
          )}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Job Type</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Full-time" />
          <FormControlLabel control={<Checkbox />} label="Internship" />
          <FormControlLabel control={<Checkbox />} label="Part-time" />
        </FormGroup>
      </Box>
    </Paper>
  );
}