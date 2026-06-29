import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './navBar';
import Home from './Home/Home';
import Jobs from './Jobs/Jobs';

// Components.js is where all routing lives
export default function Components() {
  return (
    <Router>
      {/* NavBar shows on every page */}
      <NavBar />

      {/* Routes define which component renders at each URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </Router>
  );
}