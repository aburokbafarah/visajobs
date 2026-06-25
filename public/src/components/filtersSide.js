// filters sidebar component
import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

// allows users to filter jobs by type and field
export function FiltersSide() {
  return html`
    <div>
      <h2>Filters</h2>
      <div>
        <p><strong>Visa Type</strong></p>
        <label><input type="checkbox" /> H-1B</label><br />
        <label><input type="checkbox" /> OPT</label><br />
        <label><input type="checkbox" /> CPT</label><br />
      </div>
      <div>
        <p><strong>Job Type</strong></p>
        <label><input type="checkbox" /> Full-time</label><br />
        <label><input type="checkbox" /> Internship</label><br />
        <label><input type="checkbox" /> Part-time</label><br />
      </div>
    </div>
  `;
}
