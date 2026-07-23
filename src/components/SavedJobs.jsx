import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Parse from 'parse';
import Favorite from '../models/Favorite.js';
import { JobDetailDialog } from './JobDetailDialog';
import { SaveToListControl } from './SaveToListControl';

// Shows the logged-in user's saved jobs grouped by the custom list they were
// saved into, with a way to remove a job from a list and to open the same
// job detail view used in the main Jobs list.
export function SavedJobs() {
  const currentUser = Parse.User.current();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchFavorites = () => {
      const query = new Parse.Query(Favorite);
      query.equalTo('user', currentUser);
      query.include('job');
      query.include('list');
      query
        .find()
        .then(setFavorites)
        .catch((error) => console.error('Error loading saved jobs:', error))
        .finally(() => setLoading(false));
    };

    fetchFavorites();

    // This section is mounted once alongside Home/Jobs (single-page layout,
    // not route-based), so saving a favorite from the Jobs section won't
    // naturally re-render this component - listen for that event instead.
    window.addEventListener('favorites-changed', fetchFavorites);
    return () => window.removeEventListener('favorites-changed', fetchFavorites);
  }, [currentUser]);

  const handleRemove = async (event, favorite) => {
    // Prevent this click from bubbling up to the card's own onClick, which
    // would otherwise also open the job detail dialog on top of the removal.
    event.stopPropagation();
    try {
      await favorite.destroy();
      setFavorites((prev) => prev.filter((candidate) => candidate.id !== favorite.id));
    } catch (error) {
      console.error('Error removing saved job:', error);
    }
  };

  if (!currentUser) {
    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Saved Jobs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Log in to see jobs you've saved to your lists.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  // Group favorites by their list's name
  const groups = new Map();
  for (const favorite of favorites) {
    const list = favorite.get('list');
    const job = favorite.get('job');
    if (!list || !job) continue;
    const listName = list.get('name');
    if (!groups.has(listName)) groups.set(listName, []);
    groups.get(listName).push(favorite);
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Saved Jobs
      </Typography>

      {groups.size === 0 && (
        <Typography variant="body2" color="text.secondary">
          You haven't saved any jobs yet. Open a job listing and use "Save to
          List" to get started.
        </Typography>
      )}

      {[...groups.entries()].map(([listName, items]) => (
        <Box key={listName} sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 1.5, color: 'primary.main' }}
          >
            {listName}
          </Typography>
          <Stack spacing={1.5}>
            {items.map((favorite) => {
              const job = favorite.get('job');
              const visaType = job.get('sponsorship');
              const jobType = job.get('jobType');
              return (
                <Card
                  key={favorite.id}
                  variant="outlined"
                  onClick={() => setSelectedJob(job)}
                  sx={{ cursor: 'pointer' }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {job.get('title')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {job.get('company')} · {job.get('location')}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {visaType && <Chip label={visaType} color="primary" size="small" />}
                        {jobType && <Chip label={jobType} variant="outlined" size="small" />}
                      </Stack>
                    </Box>
                    <IconButton
                      aria-label={`Remove ${job.get('title')} from ${listName}`}
                      onClick={(event) => handleRemove(event, favorite)}
                      size="small"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Box>
      ))}

      <JobDetailDialog
        job={selectedJob}
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        saveToListSlot={selectedJob && <SaveToListControl job={selectedJob} />}
      />
    </Box>
  );
}
