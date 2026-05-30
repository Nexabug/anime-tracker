import { useState } from "react";

function RatingStars({ item, Anime, setAnime }) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [hovered, sethovered] = useState(null);

  function handleEnter(i) {
    sethovered(i);
  }

  const name = item.title;

  const eps = item.episodes;

  const image_url = item.images.jpg.image_url;
  const id = item.mal_id;

  function handleClick(i) {
    sethovered(i);

    if (Anime.name === "") {
      setAnime((prev) => ({
        ...prev,
        name: name,
        eps: eps,
        myrating: i,
        url: image_url,
        id: id,
      }));
    } else {
      setAnime((prev) => ({
        ...prev,
        myrating: i,
      }));
    }
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

export default RatingStars;
