import { useState } from "react";
import { Clapperboard, Tv } from "lucide-react";
import Card from "./Card";
import Pagination from "./Pagination";
import Loader from "../components/Loader";
import FilterTab from "../utils/FilterTabs";
import MovieDetailsView from "./MovieDetailsView";
import SelectField from "../utils/SelectField";

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


  function fetchData(type) {
    setActiveFilter(type);
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      if (type == 'all') {
        newParam.delete("type");

      } else {
        newParam.set("type", type);
      }
      return newParam.toString();
    });
  }
  
  if (isLoading) return <Loader theme={theme} />;


  // ── Detail view ──────────────────────────────────────────────────────────────
  if (cardHidden) {
    return <MovieDetailsView setCardHidden={setCardHidden} data={data} isDark={isDark} />
  }

  // ── Grid view ─────────────────────────────────────────────────────────────────
  return (
    <div className={`cards-section ${isDark ? "cards-dark" : "cards-light"}`}>
      {/* Filter + results bar */}
      {results !== undefined && (
        <div className=" flex flex-wrap items-center justify-start gap-2 px-8 pt-2 pb-3 mx-auto my-0">
          <div className="flex items-center gap-2">
            {results >= 1 && (
              <div className="flex flex-wrap gap-2 border-2 rounded-full p-1 border-black/10 bg-white/5 transition-all duration-300" >
                <FilterTab
                  active={activeFilter === "all"}
                  isDark={isDark}
                  onClick={() => fetchData('all')}
                >
                  All
                </FilterTab>

                <FilterTab
                  active={activeFilter === "movie"}
                  isDark={isDark}
                  icon={<Clapperboard size={14} />}
                  onClick={() => fetchData('movie')}
                >
                  Movies
                </FilterTab>

                <FilterTab
                  active={activeFilter === "series"}
                  isDark={isDark}
                  icon={<Tv size={14} />}
                  onClick={() => fetchData("series")}
                >
                  Series
                </FilterTab>
              </div>
            )}
          </div>
          <SelectField placeholder="Select an option" label="Filter by" options={[
            { value: "all", label: "All" },
            { value: "movie", label: "Movies" },
            { value: "series", label: "Series" }
          ]} />
          <p className="results-info">
            <span>{results}</span> {results <= 1 ? "result" : "results"} found
          </p>

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
