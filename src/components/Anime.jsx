function Anime({ item, setselected }) {
  function handleClick() {
    setselected(item.mal_id);
  }
  return (
    <div className="Anime" onClick={handleClick}>
      <img src={item.images.jpg.image_url} alt={item.title} />
      <div className="info">
        <h2>{item.title}</h2>
        <div className="reviews">
          <span>Rating : {item.score}</span>
          <p>Scored by : {item.scored_by}</p>
        </div>
        <span>Total Episodes: {item.episodes}</span>
        <p>Favorites: {item.favorites}</p>
        {
          <div className="tags">
            {item.genres.map((genre) => (
              <Tag items={genre} key={genre.mal_id} />
            ))}
          </div>
        }
      </div>
    </div>
  );
}

function Tag({ items }) {
  return <span className="tag">{items.name}</span>;
}

export default Anime;
