import placeholder from "../poster_placeholder.png";

function Card({ data, updateParam, cardHidden, setCardHidden, setIsLoading, theme }) {
  const isDark = theme === "dark";
  async function fetchData() {
    setIsLoading(true);
    setCardHidden(true);
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.forEach((_, key) => newParam.delete(key));
      newParam.set("i", data.imdbID);
      return newParam.toString();
    });
  }

  if (cardHidden) return null;

  return (
    <div
      className={`movie-card ${isDark ? "card-dark" : "card-light"}`}
      onClick={fetchData}
      title={data.Title}
    >
      {/* Poster */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <img
          src={!data.Poster || data.Poster === "N/A" ? placeholder : data.Poster}
          alt={data.Title}
          loading="lazy"
          className="movie-card-poster select-none [-webkit-user-drag:none]"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }}
        />
        <div className="movie-card-overlay" />

        {/* Type badge */}
        {data.Type && (
          <span className="movie-card-type-badge">
            {data.Type === "series" ? "TV" : data.Type}
          </span>
        )}
      </div>

      {/* Info overlay */}
      <div className="movie-card-info">
        <div className="movie-card-title">{data.Title}</div>
        <div className="movie-card-year">{data.Year}</div>
      </div>
    </div>
  );
}

export default Card;
