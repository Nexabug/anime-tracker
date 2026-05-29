import { useState } from "react";

function Searchbar({searchTerm, setSearchTerm}) {
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search"
      placeholder="Search for an anime"
    />
  );
}

export default Searchbar;
