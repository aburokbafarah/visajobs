import { useState, useEffect, useRef } from 'react';
import { Container, Box, Stack, Typography } from '@mui/material';
import Parse from 'parse';
import { getJobsBySponsorshipTypes } from '../../services/jobs.jsx';
import Job from '../../models/Job.js';
import { JobCard } from '../jobCard';
import { SearchBar } from '../searchBar';
import { FiltersSide } from '../filtersSide';
import { AiTools } from '../aiTools';

// Jobs page - stateful parent component that loads job data from Parse
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visaTypeFilter, setVisaTypeFilter] = useState([]);
  const [jobTypeCheckboxFilter, setJobTypeCheckboxFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [recentlyChangedJobId, setRecentlyChangedJobId] = useState(null);

  // The LiveQuery subscription below only re-subscribes when visaTypeFilter
  // changes (that's the one filter applied at the query level, same as the
  // fetch effect above it). Job type / location are typed/toggled far more
  // often and are only checked client-side, so we read their latest values
  // from refs inside the subscription's 'create' handler instead of
  // resubscribing on every keystroke.
  const jobTypeFilterRef = useRef(jobTypeCheckboxFilter);
  const locationFilterRef = useRef(locationFilter);
  useEffect(() => {
    jobTypeFilterRef.current = jobTypeCheckboxFilter;
  }, [jobTypeCheckboxFilter]);
  useEffect(() => {
    locationFilterRef.current = locationFilter;
  }, [locationFilter]);

  // Fetch jobs from Parse whenever the visa type filter changes
  // (queries containedIn('sponsorship', ...) when types are selected, all jobs otherwise)
  useEffect(() => {
    getJobsBySponsorshipTypes(visaTypeFilter).then((data) => {
      setJobs(data);
    });
  }, [visaTypeFilter]);

  // Real-time updates: subscribe to job creations and edits matching the
  // active visa type filter so new postings appear, and edits to existing
  // ones (e.g. made directly in the Back4App dashboard) reflect immediately,
  // without a manual refresh.
  useEffect(() => {
    const query = new Parse.Query(Job);
    if (visaTypeFilter.length > 0) {
      query.containedIn('sponsorship', visaTypeFilter);
    }

    let subscription;
    let cancelled = false;

    query.subscribe().then((sub) => {
      if (cancelled) return;
      subscription = sub;
      subscription.on('create', (newJob) => {
        const matchesJobType =
          jobTypeFilterRef.current.length === 0 ||
          jobTypeFilterRef.current.includes(newJob.get('jobType'));
        const matchesLocation =
          locationFilterRef.current === '' ||
          (newJob.get('location') || '')
            .toLowerCase()
            .includes(locationFilterRef.current.toLowerCase());

        if (matchesJobType && matchesLocation) {
          setJobs((prev) => [newJob, ...prev]);
          setRecentlyChangedJobId(newJob.id);
          setTimeout(() => {
            setRecentlyChangedJobId((current) => (current === newJob.id ? null : current));
          }, 2000);
        }
      });

      subscription.on('update', (updatedJob) => {
        setJobs((prev) => {
          const index = prev.findIndex((job) => job.id === updatedJob.id);
          if (index === -1) return prev;
          const next = [...prev];
          next[index] = updatedJob;
          return next;
        });
        setRecentlyChangedJobId(updatedJob.id);
        setTimeout(() => {
          setRecentlyChangedJobId((current) => (current === updatedJob.id ? null : current));
        }, 2000);
      });
    });

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, [visaTypeFilter]);

  // Filter jobs based on search term, job type, and location
  const filteredJobs = jobs.filter(
    (job) =>
      (job.get('title').toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.get('company').toLowerCase().includes(searchTerm.toLowerCase())) &&
      (jobTypeCheckboxFilter.length === 0 ||
        jobTypeCheckboxFilter.includes(job.get('jobType'))) &&
      (locationFilter === '' ||
        (job.get('location') || '')
          .toLowerCase()
          .includes(locationFilter.toLowerCase()))
  );

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Jobs
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 1, fontWeight: 300, color: 'primary.main' }}
        >
          Get a job that will sponsor your visa
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <FiltersSide
          selectedVisaTypes={visaTypeFilter}
          setSelectedVisaTypes={setVisaTypeFilter}
          selectedJobTypes={jobTypeCheckboxFilter}
          setSelectedJobTypes={setJobTypeCheckboxFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* Map over filtered jobs and display each as a JobCard */}
          <Stack spacing={2} sx={{ mt: 3 }}>
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} highlight={job.id === recentlyChangedJobId} />
            ))}
          </Stack>
        </Box>

        <Box sx={{ width: 260, flexShrink: 0 }}>
          <AiTools />
        </Box>
      </Box>
    </Container>
  );
}