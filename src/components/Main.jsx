import AnimeList from "./AnimeList.jsx";
import Watchlist from "./Watchlist.jsx";

import { useState } from "react";
import Details from "./Details.jsx";
import Component from "./component.jsx";

function Main({ Lists }) {
  const [selected, setselected] = useState(null);
  const [Rated, setRated] = useState([]);
  const [Anime, setAnime] = useState({
    id: null,
    name: "",
    url: "",
    myrating: 0,
    eps: 0,
  });

  console.log(Lists);

  return (
    <div className="main">
      <Component>
        {
          <AnimeList
            Lists={Lists}
            setselected={setselected}
            selected={selected}
          />
        }
      </Component>

      <Component
        style={Rated.length === 0 && selected === null ? "hide-compo" : ""}
      >
        {selected ? (
          <Details
            Lists={Lists}
            selected={selected}
            setselected={setselected}
            Anime={Anime}
            setAnime={setAnime}
            setRated={setRated}
            Rated={Rated}
          />
        ) : Rated.length !== 0 ? (
          <Watchlist
            Lists={Lists}
            setRated={setRated}
            Rated={Rated}
            Anime={Anime}
            setAnime={setAnime}
            setselected={setselected}
            selected={selected}
          />
        ) : (
          <h1 style={{ textAlign: "center" }}>No WatchedList Till Now</h1>
        )}
      </Component>
    </div>
  );
}

export default Main;
