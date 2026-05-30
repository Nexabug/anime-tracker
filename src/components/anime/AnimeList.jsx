import AnimeCard from "./AnimeCard";

function AnimeList({ Lists, setselected }) {
  return (
    <div className="List">
      {Lists.map((i) => (
        <AnimeCard
          key={i.mal_id}
          item={i}
          setselected={setselected}
        />
      ))}
    </div>
  );
}

export default AnimeList;
