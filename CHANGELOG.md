# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-07-07

### Added
- Auth module with login, register, and logout functionality (Parse-backed)
- ProtectedRoute component to guard routes that require authentication
- Redirect to /auth for unauthenticated users attempting to access protected routes
- Redirect logged-in users away from /auth if they are already authenticated
  
### Changed
- Updated routing in Components.jsx to wrap Home and Jobs routes in ProtectedRoute
- NavBar and Home updated to support logout flow


## [0.2.0] - 2026-06-29

### Added
- Migrated project from Preact/HTM to React with Vite
- Added React Router DOM for client-side routing
- Added Home and Jobs pages with routing between them
- Connected Parse/Back4App as the data layer
- Created jobs service with multiple Parse query methods
- Added component tree diagram

### Changed
- Replaced Axios/JSON data fetching with Parse queries
- Converted all Preact components to React JSX
- Updated project structure to follow Vite conventions

## [0.1.0] - 2026-06-22

### Added
- Initial release with Preact/HTM
- Job listings from local JSON file
- Search and filter functionality
- NavBar, SearchBar, JobCard, FiltersSide, AiTools components
