import Anime from "./Anime";

function AnimeList({ Lists, setselected }) {
  return (
    <div className="List">
      {Lists.map((i) => (
        <Anime
          key={i.mal_id}
          item={i}
          setselected={setselected}
        />
      ))}
    </div>
  );
}

export default AnimeList;
