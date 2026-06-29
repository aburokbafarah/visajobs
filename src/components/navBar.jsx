import { Link } from 'react-router-dom';
// NavBar component - navigation bar for the visa jobs app
export function NavBar() {
  return (
    <div>
      <nav>
        <a className="logo" href="#">
          <i className="fa-solid fa-house"></i> VisaJobs
        </a>
        <div className="navLinks">
          <Link to="/" className="active">Home</Link>
          <Link to="/jobs" className="active2">Jobs</Link>
          <Link to="/jobs" className="active3">Resources</Link>
        </div>
        <div className="navSign">
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
      </nav>
      <div className="animationBar">
        <div className="animationBarIn">
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
  );
}