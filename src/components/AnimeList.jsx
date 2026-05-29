import Anime from "./Anime";

function AnimeList({ Lists, setselected, selected }) {
  return (
    <div className="List">
      {Lists.map((i) => (
        <Anime
          key={i.mal_id}
          item={i}
          setselected={setselected}
          selected={selected}
        />
      ))}
    </div>
  );
}

export default AnimeList;
