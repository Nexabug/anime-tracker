import { useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Logo from "./components/Logo.jsx";
import Searchbar from "./components/Searchbar.jsx";
import FoundResult from "./components/FoundResult.jsx";
import Spinner from "./components/Spinner.jsx";
import Component from "./components/Component.jsx";
import AnimeList from "./components/AnimeList.jsx";
import Details from "./components/Details.jsx";
import Watchlist from "./components/Watchlist.jsx";
import Detailed from "./components/Detailed.jsx";
import Hero from "./components/Hero.jsx";
import MoreInfo from "./components/MoreInfo.jsx";
import Summary from "./components/Summary.jsx";
import { Myrating } from "./components/Myrating.jsx";
import Rankings from "./components/Rankings.jsx";
import BackBtn from "./components/BackBtn.jsx";


import "./App.css";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setselected] = useState(null);
  const [Rated, setRated] = useState([]);
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

  return (
    <div className="body">
      <Header>
        <Logo />
        <Searchbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <FoundResult Lists={Lists} />
      </Header>
      {!loading ? (
        <Main>
          <Component>
            {<AnimeList Lists={Lists} setselected={setselected} />}
          </Component>
          <Component
            style={Rated.length === 0 && selected === null ? "hide-compo" : ""}
          >
            {selected ? (
              <Details>
                <BackBtn
                  setAnime={setAnime}
                  setRated={setRated}
                  setselected={setselected}
                  Rated={Rated}
                  Anime={Anime}
                />

                {Lists.filter((i) => i.mal_id === selected).map((i) => (
                  <Detailed key={i.mal_id}>
                    <Hero i={i} />
                    <Rankings i={i} />
                    <Myrating item={i} Anime={Anime} setAnime={setAnime} />
                    <Summary i={i} />
                    <MoreInfo i={i} />
                  </Detailed>
                ))}
              </Details>
            ) : Rated.length !== 0 ? (
              <Watchlist Rated={Rated} setselected={setselected} />
            ) : (
              <h1 style={{ textAlign: "center" }}>No WatchedList Till Now</h1>
            )}
          </Component>
        </Main>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
}

export default App;
