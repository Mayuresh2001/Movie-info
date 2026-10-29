import { ArrowLeft, Award, Play } from "lucide-react";
import placeholder from "../poster_placeholder.png";

const MovieDetailsView = ({ setCardHidden, data, isDark }) => {
  const handleWatchNow = (data) => {
    const { Type, imdbID } = data;

const removePrefix = (str) => {
  return str.startsWith('tt') ? str.slice(2) : str;
};
    const urlHandler = (type) => {
      // const watchNowUrl = `https://zxcprime.xyz/player/${type}/${imdbID}`;
      
      let id = removePrefix(imdbID);
      const watchNowUrl = `https://vixsrc.to/${type}/${id}${type === 'tv' ? '/1/1' : ''}`;
      window.open(watchNowUrl, "_blank");
    }

    if (Type === "series") {
      urlHandler("tv")
    } else {
      urlHandler("movie")
    }
  }

  return (
    <div className={`detail-container ${isDark ? "detail-dark" : "detail-light"}`}>
      {/* Back button */}
      <button
        className="detail-back-btn"
        onClick={() => setCardHidden(false)}
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to results
      </button>

      {/* Hero section */}
      <div className="detail-hero">
        {/* Poster */}
        <div className="detail-poster-wrap">
          <img
            className="detail-poster select-none [-webkit-user-drag:none]"
            src={!data?.Poster || data?.Poster === "N/A" ? placeholder : data?.Poster}
            alt={data?.Title}
            onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }}
          />
        </div>

        {/* Meta */}
        <div className="detail-meta-wrap">
          <h1 className="detail-title">{data?.Title}</h1>
          <div className="detail-year">{data?.Year}</div>

          {/* Badges row */}
          <div className="detail-badges">
            {data?.Rated && data?.Rated !== "N/A" && (
              <span className="detail-badge rated">{data?.Rated}</span>
            )}
            {data?.Type && (
              <span className="detail-badge type" style={{ textTransform: "capitalize" }}>
                {data?.Type}
              </span>
            )}
            {data?.Runtime && data?.Runtime !== "N/A" && (
              <span className="detail-badge">{data?.Runtime}</span>
            )}
            {data?.Genre &&
              data?.Genre !== "N/A" &&
              data?.Genre.split(",").map((g) => (
                <span key={g.trim()} className="detail-badge">
                  {g.trim()}
                </span>
              ))}
          </div>

          {/* Actions: IMDb + Watch Now */}
          <div className="detail-actions">
            {/* IMDb rating */}
            {data?.imdbRating && data?.imdbRating !== "N/A" && (
              <div className="imdb-rating">
                <span className="imdb-label">IMDb</span>
                <span className="imdb-score">{data?.imdbRating}</span>
                <span className="imdb-score-sub">/ 10</span>
              </div>
            )}

            {/* Watch Now Button */}
            <button
              className="watch-now-btn"
              onClick={() => handleWatchNow(data)}
            >
              <Play size={16} fill="currentColor" />
              <span>Watch Now</span>
            </button>
          </div>

          {/* Plot */}
          {data?.Plot && data?.Plot !== "N/A" && (
            <p className="detail-plot">{data?.Plot}</p>
          )}

          {/* Info grid */}
          <div className="detail-info-grid">
            {data?.Director && data?.Director !== "N/A" && (
              <div className="detail-info-item">
                <div className="detail-info-label">Director</div>
                <div className="detail-info-value">{data?.Director}</div>
              </div>
            )}
            {data?.Actors && data?.Actors !== "N/A" && (
              <div className="detail-info-item">
                <div className="detail-info-label">Cast</div>
                <div className="detail-info-value">{data?.Actors}</div>
              </div>
            )}
            {data?.Writer && data?.Writer !== "N/A" && (
              <div className="detail-info-item">
                <div className="detail-info-label">Writer</div>
                <div className="detail-info-value">{data?.Writer}</div>
              </div>
            )}
            {data?.Language && data?.Language !== "N/A" && (
              <div className="detail-info-item">
                <div className="detail-info-label">Language</div>
                <div className="detail-info-value">{data?.Language}</div>
              </div>
            )}
            {data?.Country && data?.Country !== "N/A" && (
              <div className="detail-info-item">
                <div className="detail-info-label">Country</div>
                <div className="detail-info-value">{data?.Country}</div>
              </div>
            )}
            {data?.Released && data?.Released !== "N/A" && (
              <div className="detail-info-item">
                <div className="detail-info-label">Released</div>
                <div className="detail-info-value">{data?.Released}</div>
              </div>
            )}
            {data?.BoxOffice && data?.BoxOffice !== "N/A" && (
              <div className="detail-info-item">
                <div className="detail-info-label">Box Office</div>
                <div className="detail-info-value">{data?.BoxOffice}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Awards banner */}
      {data?.Awards && data?.Awards !== "N/A" && (
        <div className="awards-banner">
          <Award size={20} strokeWidth={2} style={{ flexShrink: 0 }} />
          <span>{data?.Awards}</span>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsView
