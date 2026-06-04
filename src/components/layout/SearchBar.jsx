function SearchBar({ searchTerm, setSearchTerm, inputEle }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search"
      placeholder="Search The Anime"
      ref={inputEle}
    />
  );
}

export default SearchBar;
