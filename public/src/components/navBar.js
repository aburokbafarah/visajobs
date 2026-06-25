import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

export function NavBar() {
  return html`
    <div>
      <nav>
        <a class="logo" href="#">
          <i class="fa-solid fa-house"></i> VisaJobs
        </a>
        <div class="navLinks">
          <a href="#" class="active">Home</a>
          <a href="#" class="active2">Jobs</a>
          <a href="#" class="active3">Resources</a>
        </div>
        <div class="navSign">
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
      </nav>
      <div class="animationBar">
        <div class="animationBarIn">
          <span>H-1B Sponsorship</span>
          <span>OPT Friendly</span>
          <span>CPT Eligible</span>
          <span>Green Card Sponsorship</span>
          <span>Remote Friendly</span>
          <span>H-1B Sponsorship</span>
          <span>OPT Friendly</span>
          <span>CPT Eligible</span>
          <span>Green Card Sponsorship</span>
          <span>Remote Friendly</span>
        </div>
      </div>
    </div>
  `;
}
