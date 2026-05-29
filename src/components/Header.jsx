import Logo from "./Logo";
import Searchbar from "./Searchbar";

function Header({ searchTerm, setSearchTerm, Lists }) {
  return (
    <div className="header">
      <Logo />
      <Searchbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <h4>Total Anime Found: <em>{Lists.length}</em></h4>
    </div>
  );
}

export default Header;
