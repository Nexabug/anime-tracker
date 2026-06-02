function Watchlist({ Rated, setselected, handleDelete }) {
  return (
    <div className="watched">
      <h2>Watched</h2>
      {Rated.map((i) => (
        <div
          className="watch-detail"
          key={i.id}
          onClick={() => setselected(i.id)}
        >
          {i.name !== "" && (
            <>
              <img src={i.url} alt={i.name} className="watch-img" />
              <div className="watched-info">
                <h3> Animes: {i.name}</h3>
                <h3> Episodes: {i.eps}</h3>
                <h3> My Rating: {i.myrating}</h3>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(e, i.name)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
