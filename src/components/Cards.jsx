import React, { useState } from "react";
import { ArrowLeft, Award, Clapperboard, Tv, Play } from "lucide-react";
import placeholder from "../poster_placeholder.png";
import Card from "./Card";
import Pagination from "./Pagination";
import Loader from "../components/Loader";

function Cards({
  setData,
  data,
  updateParam,
  isLoading,
  setIsLoading,
  cardHidden,
  setCardHidden,
  theme,
}) {
  const isDark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState("all");

  let allMovies = [];
  if (data && data.Search && Array.isArray(data.Search)) {
    allMovies = data.Search;
  }

  const results = data?.totalResults;

  function fetchMovieData() {
    setActiveFilter("movie");
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.set("type", "movie");
      return newParam.toString();
    });
  }

  function fetchSeriesData() {
    setActiveFilter("series");
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.set("type", "series");
      return newParam.toString();
    });
  }

  function fetchAllData() {
    setActiveFilter("all");
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.delete("type");
      return newParam.toString();
    });
  }

  if (isLoading) return <Loader theme={theme} />;

  const handleWatchNow = (data) => {
    const { Type, imdbID } = data;

    const urlHandler = (type) => {
      const watchNowUrl = `https://zxcprime.xyz/player/${type}/${imdbID}`;
      window.open(watchNowUrl, "_self");
    }

    if (Type === "series") {
      urlHandler("tv")
    } else {
      urlHandler("movie")
    }
  }

  // ── Detail view ──────────────────────────────────────────────────────────────
  if (cardHidden) {
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
              className="detail-poster"
              src={!data.Poster || data.Poster === "N/A" ? placeholder : data.Poster}
              alt={data.Title}
              onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }}
            />
          </div>

          {/* Meta */}
          <div className="detail-meta-wrap">
            <h1 className="detail-title">{data.Title}</h1>
            <div className="detail-year">{data.Year}</div>

            {/* Badges row */}
            <div className="detail-badges">
              {data.Rated && data.Rated !== "N/A" && (
                <span className="detail-badge rated">{data.Rated}</span>
              )}
              {data.Type && (
                <span className="detail-badge type" style={{ textTransform: "capitalize" }}>
                  {data.Type}
                </span>
              )}
              {data.Runtime && data.Runtime !== "N/A" && (
                <span className="detail-badge">{data.Runtime}</span>
              )}
              {data.Genre &&
                data.Genre !== "N/A" &&
                data.Genre.split(",").map((g) => (
                  <span key={g.trim()} className="detail-badge">
                    {g.trim()}
                  </span>
                ))}
            </div>

            {/* Actions: IMDb + Watch Now */}
            <div className="detail-actions">
              {/* IMDb rating */}
              {data.imdbRating && data.imdbRating !== "N/A" && (
                <div className="imdb-rating">
                  <span className="imdb-label">IMDb</span>
                  <span className="imdb-score">{data.imdbRating}</span>
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
            {data.Plot && data.Plot !== "N/A" && (
              <p className="detail-plot">{data.Plot}</p>
            )}

            {/* Info grid */}
            <div className="detail-info-grid">
              {data.Director && data.Director !== "N/A" && (
                <div className="detail-info-item">
                  <div className="detail-info-label">Director</div>
                  <div className="detail-info-value">{data.Director}</div>
                </div>
              )}
              {data.Actors && data.Actors !== "N/A" && (
                <div className="detail-info-item">
                  <div className="detail-info-label">Cast</div>
                  <div className="detail-info-value">{data.Actors}</div>
                </div>
              )}
              {data.Writer && data.Writer !== "N/A" && (
                <div className="detail-info-item">
                  <div className="detail-info-label">Writer</div>
                  <div className="detail-info-value">{data.Writer}</div>
                </div>
              )}
              {data.Language && data.Language !== "N/A" && (
                <div className="detail-info-item">
                  <div className="detail-info-label">Language</div>
                  <div className="detail-info-value">{data.Language}</div>
                </div>
              )}
              {data.Country && data.Country !== "N/A" && (
                <div className="detail-info-item">
                  <div className="detail-info-label">Country</div>
                  <div className="detail-info-value">{data.Country}</div>
                </div>
              )}
              {data.Released && data.Released !== "N/A" && (
                <div className="detail-info-item">
                  <div className="detail-info-label">Released</div>
                  <div className="detail-info-value">{data.Released}</div>
                </div>
              )}
              {data.BoxOffice && data.BoxOffice !== "N/A" && (
                <div className="detail-info-item">
                  <div className="detail-info-label">Box Office</div>
                  <div className="detail-info-value">{data.BoxOffice}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Awards banner */}
        {data.Awards && data.Awards !== "N/A" && (
          <div className="awards-banner">
            <Award size={20} strokeWidth={2} style={{ flexShrink: 0 }} />
            <span>{data.Awards}</span>
          </div>
        )}
      </div>
    );
  }

  // ── Grid view ─────────────────────────────────────────────────────────────────
  return (
    <div className={`cards-section ${isDark ? "cards-dark" : "cards-light"}`}>
      {/* Filter + results bar */}
      {results !== undefined && (
        <div className="results-bar">
          <p className="results-info">
            <span>{results}</span> {results <= 1 ? "result" : "results"} found
          </p>

          {results >= 1 && (
            <div className="filter-bar">
              <button
                className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
                onClick={fetchAllData}
              >
                All
              </button>
              <button
                className={`filter-tab ${activeFilter === "movie" ? "active" : ""}`}
                onClick={fetchMovieData}
              >
                <Clapperboard size={14} style={{ marginRight: 4 }} /> Movies
              </button>
              <button
                className={`filter-tab ${activeFilter === "series" ? "active" : ""}`}
                onClick={fetchSeriesData}
              >
                <Tv size={14} style={{ marginRight: 4 }} /> Series
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty / no-search state */}
      {allMovies.length === 0 && !isLoading && (
        <div className="empty-state">
          <div className="empty-state-icon"><Clapperboard size={48} /></div>
          <h3>Find your next favourite</h3>
          <p>Search for any movie or TV show above to get started</p>
        </div>
      )}

      {/* Cards grid */}
      {allMovies.length > 0 && (
        <div className="cards-grid">
          {allMovies.map((movie) => (
            <Card
              key={movie.imdbID}
              setData={setData}
              data={movie}
              updateParam={updateParam}
              cardHidden={cardHidden}
              setCardHidden={setCardHidden}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              theme={theme}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {results >= 11 && (
        <Pagination results={results} updateParam={updateParam} theme={theme} />
      )}
    </div>
  );
}

export default Cards;
