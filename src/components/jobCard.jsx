// displays a single job listing card
// receives one job object as a prop and displays it
export function JobCard({ job }) {
  return (
    <div className="jobCard">
      <h3>{job.get('title')}</h3>
      <p>{job.get('company')} · {job.get('location')}</p>
      <p>{job.get('jobType')} · {job.get('salary')}</p>
      <p>{job.get('description')}</p>
    </div>
  );
}