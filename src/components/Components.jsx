import {BrowserRouter as Router,Routes,Route, Navigate,} from 'react-router-dom';
import { NavBar } from './navBar';
import MainPage from './MainPage/MainPage';
import AuthModule from './Auth/Auth';
import AuthRegister from './Auth/AuthRegister';
import AuthLogin from './Auth/AuthLogin';
import ResumeChecker from './Tools/ResumeChecker';
import VisaAdvisor from './Tools/VisaAdvisor';
import CoverLetterGenerator from './Tools/CoverLetterGenerator';

export default function Components() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Auth routes */}
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />

        {/* Single scrolling page (Home/Jobs/Resources sections) - public,
            not gated behind login */}
        <Route path="/" element={<MainPage />} />

        {/* AI Tools placeholder pages - reached only when logged in
            (see aiTools.jsx), each its own route to build out individually */}
        <Route path="/tools/resume-checker" element={<ResumeChecker />} />
        <Route path="/tools/visa-advisor" element={<VisaAdvisor />} />
        <Route path="/tools/cover-letter-generator" element={<CoverLetterGenerator />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}