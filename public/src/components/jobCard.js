// displays a single job listing card
import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

// receives one job object as a prop and displays it
export function JobCard({ job }) {
  return html`
    <div class="jobCard">
      <h3>${job.jobTitle}</h3>
      <p>${job.company} · ${job.location}</p>
      <p>${job.jobType} · ${job.salary}</p>
      <p>${job.description}</p>
    </div>
  `;
}
