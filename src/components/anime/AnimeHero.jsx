import { Tag } from "../ui/Tag";

function AnimeHero({ i }) {
  return (
    <div className="hero">
      <img src={i.images.jpg.image_url} alt={i.title} className="hero-img" />
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
  );
}

export default AnimeHero;
