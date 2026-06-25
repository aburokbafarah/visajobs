// ai tools sidebar component
import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

// provides ai powered tools for international students
export function AiTools() {
  return html`
    <div>
      <h2>AI Tools</h2>
      <div class="aiToolItem">Resume Checker</div>
      <div class="aiToolItem">Visa Advisor</div>
      <div class="aiToolItem">Cover Letter Generator</div>
    </div>
  `;
}
