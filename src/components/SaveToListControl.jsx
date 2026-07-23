import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Stack,
  Alert,
} from '@mui/material';
import Parse from 'parse';
import FavoriteList from '../models/FavoriteList.js';
import Favorite from '../models/Favorite.js';

// Lets a logged-in user save a job into one of their custom favorite lists,
// creating the list inline if they don't have one yet.
export function SaveToListControl({ job }) {
  const currentUser = Parse.User.current();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListId, setSelectedListId] = useState('');
  const [newListName, setNewListName] = useState('');
  const [creatingNew, setCreatingNew] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const query = new Parse.Query(FavoriteList);
    query.equalTo('user', currentUser);
    query
      .find()
      .then((results) => {
        setLists(results);
        setCreatingNew(results.length === 0);
      })
      .catch((error) => {
        console.error('Error loading favorite lists:', error);
      })
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleCreateList = async () => {
    if (!currentUser || !newListName.trim()) return;

    try {
      const list = new FavoriteList();
      list.set('user', currentUser);
      list.set('name', newListName.trim());
      const saved = await list.save();
      setLists((prev) => [...prev, saved]);
      setSelectedListId(saved.id);
      setNewListName('');
      setCreatingNew(false);
      setStatus(null);
    } catch (error) {
      console.error('Error creating favorite list:', error);
      setStatus({ type: 'error', message: 'Could not create list.' });
    }
  };

  const handleSaveToList = async (listId) => {
    if (!currentUser || !listId) return;
    const list = lists.find((candidate) => candidate.id === listId);
    if (!list) return;

    try {
      const favorite = new Favorite();
      favorite.set('user', currentUser);
      favorite.set('job', job);
      favorite.set('list', list);
      await favorite.save();
      setStatus({ type: 'success', message: `Saved to "${list.get('name')}".` });
      // SavedJobs lives in a totally different section of this single-page
      // app (mounted once, not re-rendered on navigation), so it has no
      // other way to know a favorite was just added - this event lets it
      // refetch without needing a shared state manager.
      window.dispatchEvent(new Event('favorites-changed'));
    } catch (error) {
      console.error('Error saving favorite:', error);
      setStatus({ type: 'error', message: 'Could not save job to list.' });
    }
  };

  if (!currentUser) {
    return (
      <Typography variant="body2" color="text.secondary">
        Log in to save this job to a list.
      </Typography>
    );
  }

  if (loading) {
    return null;
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Save to List
      </Typography>

      {status && (
        <Alert
          severity={status.type}
          sx={{ mb: 1.5 }}
          onClose={() => setStatus(null)}
        >
          {status.message}
        </Alert>
      )}

      {lists.length > 0 && !creatingNew && (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Select
            size="small"
            value={selectedListId}
            displayEmpty
            onChange={(e) => setSelectedListId(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="" disabled>
              Choose a list
            </MenuItem>
            {lists.map((list) => (
              <MenuItem key={list.id} value={list.id}>
                {list.get('name')}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            disabled={!selectedListId}
            onClick={() => handleSaveToList(selectedListId)}
          >
            Save
          </Button>
          <Button variant="text" size="small" onClick={() => setCreatingNew(true)}>
            + New list
          </Button>
        </Stack>
      )}

      {(lists.length === 0 || creatingNew) && (
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="e.g. Applying, Backup, Dream Job"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleCreateList}
            disabled={!newListName.trim()}
          >
            Create
          </Button>
          {lists.length > 0 && (
            <Button variant="text" size="small" onClick={() => setCreatingNew(false)}>
              Cancel
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}
