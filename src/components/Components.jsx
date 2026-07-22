import {BrowserRouter as Router,Routes,Route, Navigate,} from 'react-router-dom';
import { NavBar } from './navBar';
import MainPage from './MainPage/MainPage';
import AuthModule from './Auth/Auth';
import AuthRegister from './Auth/AuthRegister';
import AuthLogin from './Auth/AuthLogin';
import ProtectedRoute from './Auth/ProtectedRoute';

export default function Components() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />

        {/* Protected route - single scrolling page (Home/Jobs/Resources sections) */}
        <Route path="/" element={<ProtectedRoute component={MainPage} />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}