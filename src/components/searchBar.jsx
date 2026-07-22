// search bar component for filtering jobs
// allows users to search by keyword and filter by field

export function SearchBar({ searchTerm, setSearchTerm, setJobTypeFilter }) {
  return (
    <div className="searchBar">
      <div className="searchRow">
        <input
          type="text"
          placeholder="Job title, skill or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setJobTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Part-time">Part-time</option>
        </select>
        {/* Clear button resets search and filter */}
        <button
          type="button"
          onClick={() => {
            setSearchTerm("");
            setJobTypeFilter("");
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
