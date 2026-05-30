import { useState } from "react";

function Details({
  Lists,
  selected,
  setselected,
  Anime,
  setAnime,
  setRated,
  Rated,
}) {
  function handleClick() {
    setselected(null);

    const already = Rated.some((i) => i.name === Anime.name) ? true : false;
    if (Anime.name !== "") {
      setRated((prev) =>
        already
          ? prev.map((i) =>
              i.name === Anime.name ? { ...i, myrating: Anime.myrating } : i,
            )
          : [...prev, Anime],
      );

      setalready((i) => (i = false));

      setAnime({
        id: null,
        name: "",
        url: "",
        myrating: 0,
        eps: 0,
      });
    }
  }
  return (
    <>
      <button onClick={handleClick} className="back-btn">
        back
      </button>
      {Lists.filter((i) => i.mal_id === selected).map((i) => (
        <div className="details" key={i.mal_id}>
          <div className="hero">
            <img
              src={i.images.jpg.image_url}
              alt={i.title}
              className="hero-img"
            />
            <div className="extra-info">
              <h2>
                {i.title} | {i.title_japanese}
              </h2>

              <p>Score: {i.score}</p>
              <p>Favorites: {i.favorites}</p>
              <p>Total Eps: {i.episodes}</p>
              <p>Status: {i.status}</p>
              <p>Season: {i.season}</p>
              <p>Aired: {i.aired.string}</p>
              <p>Duration: {i.duration}</p>
              <p>Total Members: {i.members}</p>
              {
                <div className="tags">
                  {i.genres.map((genre) => (
                    <Tag items={genre} key={genre.mal_id} />
                  ))}
                </div>
              }
            </div>
          </div>

          <div className="rankings">
            <Rank> Popularity: {i.popularity}</Rank>
            <Rank>Rank: {i.rank}</Rank>
            <span className="rating">{i.rating}</span>
          </div>

          <Myrating
            item={i}
            Anime={Anime}
            setAnime={setAnime}
            setRated={setRated}
            Rated={Rated}
          />

          <div className="summary">
            <p>{i.synopsis}</p>
          </div>

          <a
            href={i.url}
            className="more-info-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            More Info
          </a>
        </div>
      ))}
    </>
  );
}

function Rank({ children }) {
  return <span>{children}</span>;
}
function Tag({ items }) {
  return <span className="tag">{items.name}</span>;
}

function Myrating({ item, Anime, setAnime, setRated, Rated }) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [hovered, sethovered] = useState(null);

  function handleEnter(i) {
    sethovered((prev) => (prev = i));
  }

  const name = item.title;

  const eps = item.episodes;

  const image_url = item.images.jpg.image_url;
  const id = item.mal_id;

  function handleClick(i) {
    sethovered((prev) => (prev = i));

    if (Anime.name === "") {
      setAnime((prev) => ({
        ...prev,
        name: name,
        eps: eps,
        myrating: hovered,
        url: image_url,
        id: id,
      }));
    } else {
      setAnime((prev) => ({
        ...prev,
        myrating: hovered,
      }));
    }

    console.log(Anime);
  }
  return (
    <div className="my-rating">
      <div className="stars-container">
        {arr.map((i) => (
          <div
            className="stars"
            key={i}
            onMouseEnter={() => handleEnter(i)}
            onClick={() => handleClick(i)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={hovered >= i ? "yellow" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
