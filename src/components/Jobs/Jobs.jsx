import { useState, useEffect } from 'react';
import { Container, Box, Stack, Typography } from '@mui/material';
import { getJobsBySponsorshipTypes } from '../../services/jobs.jsx';
import { JobCard } from '../jobCard';
import { SearchBar } from '../searchBar';
import { FiltersSide } from '../filtersSide';
import { AiTools } from '../aiTools';

// Jobs page - stateful parent component that loads job data from Parse
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [visaTypeFilter, setVisaTypeFilter] = useState([]);
  const [jobTypeCheckboxFilter, setJobTypeCheckboxFilter] = useState([]);

  // Fetch jobs from Parse whenever the visa type filter changes
  // (queries containedIn('sponsorship', ...) when types are selected, all jobs otherwise)
  useEffect(() => {
    getJobsBySponsorshipTypes(visaTypeFilter).then((data) => {
      setJobs(data);
    });
  }, [visaTypeFilter]);

  // Filter jobs based on search term and job type
  const filteredJobs = jobs.filter(
    (job) =>
      (job.get('title').toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.get('company').toLowerCase().includes(searchTerm.toLowerCase())) &&
      (jobTypeFilter === '' || job.get('jobType') === jobTypeFilter) &&
      (jobTypeCheckboxFilter.length === 0 ||
        jobTypeCheckboxFilter.includes(job.get('jobType')))
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
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setJobTypeFilter={setJobTypeFilter}
          />
          {/* Map over filtered jobs and display each as a JobCard */}
          <Stack spacing={2} sx={{ mt: 3 }}>
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
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