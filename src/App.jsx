import { useEffect, useState } from "react";
import AnimeDetails from "./components/anime/AnimeDetails.jsx";
import AnimeHero from "./components/anime/AnimeHero.jsx";
import AnimeList from "./components/anime/AnimeList.jsx";
import AnimeRankings from "./components/anime/AnimeRankings.jsx";
import AnimeSummary from "./components/anime/AnimeSummary.jsx";
import BackButton from "./components/anime/BackButton.jsx";
import MoreInfoLink from "./components/anime/MoreInfoLink.jsx";
import RatingStars from "./components/anime/RatingStars.jsx";
import Watchlist from "./components/anime/Watchlist.jsx";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import Logo from "./components/layout/Logo.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import Panel from "./components/layout/Panel.jsx";
import ResultCount from "./components/layout/ResultCount.jsx";
import SearchBar from "./components/layout/SearchBar.jsx";
import Spinner from "./components/ui/Spinner.jsx";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setselected] = useState(null);
  const [Rated, setRated] = useState(() => {
    const data = localStorage.getItem("rated");
    return data ? JSON.parse(data) : [];
  });
  const [Anime, setAnime] = useState({
    id: null,
    name: "",
    url: "",
    myrating: 0,
    eps: 0,
  });

  useEffect(() => {
    async function getAnime() {
      //starting the loading
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}`);
      const data = await res.json();
      setLists(data.data);
      // finshing the loading
      setLoading(false);
    }

    getAnime();
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("rated", JSON.stringify(Rated));
  }, [Rated]);

  function handleDelete(e, name) {
    e.stopPropagation();
    setRated((prev) => prev.filter((p) => p.name !== name));
  }
  return (
    <div className="body">
      <Header>
        <Logo />
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <ResultCount Lists={Lists} />
      </Header>
      {!loading ? (
        <MainLayout>
          <Panel>
            <AnimeList Lists={Lists} setselected={setselected} />
          </Panel>
          <Panel
            style={Rated.length === 0 && selected === null ? "hide-compo" : ""}
          >
            {selected ? (
              <AnimeDetails>
                <BackButton
                  setAnime={setAnime}
                  setRated={setRated}
                  setselected={setselected}
                  Rated={Rated}
                  Anime={Anime}
                />

                {Lists.filter((i) => i.mal_id === selected).map((i) => (
                  <div className="details" key={i.mal_id}>
                    <AnimeHero i={i} />
                    <AnimeRankings i={i} />
                    <RatingStars item={i} Anime={Anime} setAnime={setAnime} />
                    <AnimeSummary i={i} />
                    <MoreInfoLink i={i} />
                  </div>
                ))}
              </AnimeDetails>
            ) : Rated.length !== 0 ? (
              <Watchlist
                Rated={Rated}
                setselected={setselected}
                handleDelete={handleDelete}
              />
            ) : (
              <h1 style={{ textAlign: "center" }}>No WatchedList Till Now</h1>
            )}
          </Panel>
        </MainLayout>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
}

export default App;
