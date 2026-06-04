import { useEffect, useRef, useState } from "react";
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
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [ratedAnime, setRatedAnime] = useState(() => {
    const data = localStorage.getItem("rated");
    return data ? JSON.parse(data) : [];
  });
  const [anime, setAnime] = useState({
    id: null,
    name: "",
    url: "",
    myrating: 0,
    eps: 0,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      async function getAnime() {
        setLoading(true);

        const res = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}`,
        );
        const data = await res.json();

        setAnimeList(data.data);
        setLoading(false);
      }

      getAnime();
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("rated", JSON.stringify(ratedAnime));
  }, [ratedAnime]);

  const inputEle = useRef(null);

  useEffect(() => {
    inputEle.current.focus();
  }, []);

  useEffect(() => {
    
    function handleEnterPress(e) {
      if (document.activeElement === inputEle.current) return;
      if (e.key === "Enter") {
        setSearchTerm("");
        inputEle.current.focus();
      }
    }
    document.addEventListener("keydown", (e) => handleEnterPress(e));
  }, []);
  function handleDelete(e, name) {
    e.stopPropagation();
    setRatedAnime((prev) => prev.filter((p) => p.name !== name));
  }

  return (
    <div className="body">
      <Header>
        <Logo />
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          inputEle={inputEle}
        />
        <ResultCount Lists={animeList} />
      </Header>
      {!loading ? (
        <MainLayout>
          <Panel>
            <AnimeList Lists={animeList} setselected={setSelectedAnimeId} />
          </Panel>
          <Panel
            style={
              ratedAnime.length === 0 && selectedAnimeId === null
                ? "hide-compo"
                : ""
            }
          >
            {selectedAnimeId ? (
              <AnimeDetails>
                <BackButton
                  setAnime={setAnime}
                  setRated={setRatedAnime}
                  setselected={setSelectedAnimeId}
                  Rated={ratedAnime}
                  Anime={anime}
                />

                {animeList
                  .filter((i) => i.mal_id === selectedAnimeId)
                  .map((i) => (
                    <div className="details" key={i.mal_id}>
                      <AnimeHero i={i} />
                      <AnimeRankings i={i} />
                      <RatingStars item={i} Anime={anime} setAnime={setAnime} />
                      <AnimeSummary i={i} />
                      <MoreInfoLink i={i} />
                    </div>
                  ))}
              </AnimeDetails>
            ) : ratedAnime.length !== 0 ? (
              <Watchlist
                Rated={ratedAnime}
                setselected={setSelectedAnimeId}
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
