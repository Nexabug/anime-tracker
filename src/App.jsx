import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Lists, setLists] = useState([]);

  useEffect(() => {
    async function getAnime() {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}`);

      const data = await res.json();

      setLists(data.data);
    }

    getAnime();
  }, [searchTerm]);
  return (
    <div className="body">
      <Header
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        Lists={Lists}
      />
      <Main Lists={Lists} />
      <Footer />
    </div>
  );
}

export default App;
