import { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import Parse from 'parse';
import AlertPreference from '../models/AlertPreference.js';

const VISA_TYPE_OPTIONS = ['H-1B', 'OPT', 'CPT'];

// Lets a logged-in user configure which visa types / keywords
// should trigger email alerts for new matching job postings.
export function AlertSettings() {
  const currentUser = Parse.User.current();

  const [visaTypes, setVisaTypes] = useState([]);
  const [keywordsInput, setKeywordsInput] = useState('');
  const [existingPreference, setExistingPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const query = new Parse.Query(AlertPreference);
    query.equalTo('user', currentUser);
    query
      .first()
      .then((preference) => {
        if (preference) {
          setExistingPreference(preference);
          setVisaTypes(preference.get('visaTypes') || []);
          setKeywordsInput((preference.get('keywords') || []).join(', '));
        }
      })
      .catch((error) => {
        console.error('Error loading alert preference:', error);
      })
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;

    const keywords = keywordsInput
      .split(',')
      .map((kw) => kw.trim())
      .filter(Boolean);

    const preference = existingPreference || new AlertPreference();
    preference.set('user', currentUser);
    preference.set('visaTypes', visaTypes);
    preference.set('keywords', keywords);

    try {
      const saved = await preference.save();
      setExistingPreference(saved);
      setStatus({ type: 'success', message: 'Alert preferences saved.' });
    } catch (error) {
      console.error('Error saving alert preference:', error);
      setStatus({ type: 'error', message: 'Could not save alert preferences.' });
    }
  };

  if (!currentUser) {
    return (
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Typography variant="body2">Log in to set up job alerts.</Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2.5, maxWidth: 480 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Email Job Alerts</Typography>

      <Box sx={{ mb: 2.5 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Visa Type</Typography>
        <Autocomplete
          multiple
          size="small"
          options={VISA_TYPE_OPTIONS}
          value={visaTypes}
          onChange={(event, newValue) => setVisaTypes(newValue)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select visa types" />
          )}
        />
      </Box>

      <Box sx={{ mb: 2.5 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Keywords</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="e.g. software engineer, remote"
          value={keywordsInput}
          onChange={(e) => setKeywordsInput(e.target.value)}
          helperText="Comma-separated. We'll email you when a new job matches."
        />
      </Box>

      {status && (
        <Alert severity={status.type} sx={{ mb: 2 }} onClose={() => setStatus(null)}>
          {status.message}
        </Alert>
      )}

      <Button variant="contained" onClick={handleSave} disabled={loading}>
        Save Alert Preferences
      </Button>
    </Paper>
  );
}
