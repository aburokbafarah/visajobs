// Service file for fetching job posting
// Uses axios to retrieve jobs form JSON file
export function getJobs() {
  const axios = window.axios;
  // GET request to local job
  return axios.get("/src/jobs.json").then((response) => {
    //return the jobs in the array for the response
    return response.data.jobs;
  });
}
