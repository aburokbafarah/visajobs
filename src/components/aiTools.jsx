import { Box, Typography, Stack, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';

const AI_TOOLS = ['Resume Checker', 'Visa Advisor', 'Cover Letter Generator'];

// ai tools sidebar component
// provides ai powered tools for international students
export function AiTools() {
  const handleToolClick = (toolName) => {
    console.log(toolName);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        AI Tools
      </Typography>
      <Stack spacing={2}>
        {AI_TOOLS.map((tool) => (
          <Button
            key={tool}
            onClick={() => handleToolClick(tool)}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontWeight: 500,
              color: 'text.primary',
              borderRadius: 2,
              px: 2,
              py: 1.25,
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                color: 'primary.main',
              },
            }}
          >
            {tool}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
