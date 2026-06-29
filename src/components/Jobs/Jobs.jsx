import { useState, useEffect } from 'react';
import { getAllJobs } from '../../services/jobs.jsx';
import { JobCard } from '../jobCard';
import { SearchBar } from '../searchBar';
import { FiltersSide } from '../filtersSide';
import { AiTools } from '../aiTools';

// Jobs page - stateful parent component that loads job data from Parse
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');

  // Fetch jobs from Parse on component mount
  useEffect(() => {
    getAllJobs().then((data) => {
      setJobs(data);
    });
  }, []);

  // Filter jobs based on search term and job type
  const filteredJobs = jobs.filter(
    (job) =>
      (job.get('title').toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.get('company').toLowerCase().includes(searchTerm.toLowerCase())) &&
      (jobTypeFilter === '' || job.get('jobType') === jobTypeFilter)
  );

  return (
    <div className="fullContainer">
      <aside className="filtersSide">
        <FiltersSide />
      </aside>
      <section className="mainSearchInfo">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setJobTypeFilter={setJobTypeFilter}
        />
        {/* Map over filtered jobs and display each as a JobCard */}
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
      <aside className="aiTools">
        <AiTools />
      </aside>
    </div>
  );
}