export default function BackButton({
  setAnime,
  setRated,
  setselected,
  Rated,
  Anime,
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
    <button onClick={handleClick} className="back-btn">
      back
    </button>
  );
}
