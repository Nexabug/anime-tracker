function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search"
      placeholder="Search The Anime"
    />
  );
}

export default SearchBar;
