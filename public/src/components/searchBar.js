// search bar component for filtering jobs
import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

// allows users to search by keyword and filter by field

export function SearchBar({ searchTerm, setSearchTerm, setJobTypeFilter }) {
  return html`
    <div class="searchBar">
      <h1>Get a job that will sponsor your visa</h1>
      <div class="searchRow">
        <input
          type="text"
          placeholder="Job title, skill or company..."
          value=${searchTerm}
          onInput=${(e) => setSearchTerm(e.target.value)}
        />
        <select onInput=${(e) => setJobTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Part-time">Part-time</option>
        </select>
        <button
          type="button"
          onClick=${() => {
            setSearchTerm("");
            setJobTypeFilter("");
          }}
        >
          Clear
        </button>
      </div>
    </div>
  `;
}
