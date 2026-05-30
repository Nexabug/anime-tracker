import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAnime() {
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}`);

      const data = await res.json();

      setLists(data.data);
      setLoading(false);
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
      {!loading ? (
        <Main Lists={Lists} />
      ) : (
        <div className="spinner">
          <div className="loading-spinner "> </div>{" "}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
