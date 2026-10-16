import { Search, X } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

// Popular genre/mood quick-search chips
const QUICK_SEARCHES = [
  "Action", "Comedy", "Horror", "Sci-Fi", "Thriller", "Romance", "Drama", "Animation",
];

function Searchbar({ updateParam, setCardHidden, theme }) {
  const isDark = theme === "dark";
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // ── Ctrl+K / Cmd+K to focus ──────────────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ── Debounced search (400 ms) ─────────────────────────────────────────────
  const fireSearch = useCallback(
    (query) => {
      updateParam((prev) => {
        const p = new URLSearchParams(prev);
        p.forEach((_, key) => p.delete(key));
        if (query.trim()) p.set("s", query.trim());
        else p.delete("s");
        return p.toString();
      });
    },
    [updateParam]
  );

  function handleInput(e) {
    const v = e.target.value;
    setValue(v);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fireSearch(v), 400);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      clearTimeout(debounceTimer.current);
      fireSearch(value);
    }
    if (e.key === "Escape") handleClear();
  }

  function handleClear() {
    setValue("");
    clearTimeout(debounceTimer.current);
    fireSearch("");
    inputRef.current?.focus();
  }

  function handleChip(label) {
    setValue(label);
    fireSearch(label);
    inputRef.current?.focus();
  }

  return (
    <div className={`search-section ${isDark ? "search-dark" : "search-light"}`}>

      {/* ── Hero ── */}
      <div className="search-hero-text">
        <h2>Discover <span>Movies</span> &amp; TV Shows</h2>
        <p>Search across millions of titles — press <kbd className={`search-kbd ${isDark ? "kbd-dark" : "kbd-light"}`}>Ctrl K</kbd> to focus</p>
      </div>

      {/* ── Search bar ── */}
      <div className="search-wrapper">
        <div className={`search-input-group ${isFocused ? "search-focused" : ""}`}>

          {/* Magnifier */}
          <Search className={`search-icon ${isFocused ? "search-icon-active" : ""}`} size={18} strokeWidth={2} />

          {/* Input */}
          <input
            ref={inputRef}
            id="search"
            type="text"
            value={value}
            placeholder="Search movies, TV shows, series…"
            className="search-input searchbox"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => { setIsFocused(true); setCardHidden(false); }}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Search movies and TV shows"
          />

          {/* Clear */}
          {value.length > 0 && (
            <button onClick={handleClear} title="Clear (Esc)"
              className={`search-clear-btn ${isDark ? "clear-dark" : "clear-light"}`}
              aria-label="Clear search">
              <X size={13} strokeWidth={2.5} />
            </button>
          )}

          {/* Search + Filter buttons */}
          {/* <div className="search-actions-group">
            {value.length > 0 && (
              <button
                onClick={() => {setFilters(true)}}
                title="Filters"
                className={`filter-pop-btn ${isDark ? "filter-pop-dark" : "filter-pop-light"}`}
                aria-label="Filters"
              >
                <SlidersHorizontal size={18} strokeWidth={2} />
              </button>
            )} */}

          <button
            className="search-submit-btn"
            type="button"
            onClick={() => { clearTimeout(debounceTimer.current); fireSearch(value); }}
            aria-label="Search"
          >
            <Search size={15} strokeWidth={2.5} style={{ marginRight: "6px" }} />
            Search
          </button>
        </div>
      </div>

      {/* ── Quick-search chips ── */}
      <div className=" flex flex-wrap gap-2 justify-center mt-3">
        {QUICK_SEARCHES.map((chip) => (
          <button
            key={chip}
            className={`
    px-3.75 py-[5px]
    rounded-full
    text-[0.78rem]
    font-medium
    font-['Inter']
    cursor-pointer
    transition-all duration-(--transition)
    border-border
 border-2

    ${value === chip
                ? `
          bg-[linear-gradient(135deg,var(--red),var(--red-dark))]
              text-white
              shadow-[0_2px_12px_var(--red-glow)]
          border-transparent!

        `
                : isDark
                  ? `
            bg-[#ffffff0d]
            border-[#ffffff17]
            text-[#4a5f72]
            hover:bg-[#e639461a]
            hover:border-[rgba(230,57,70,0.3)]
            hover:text-[#e0e0e0]
          `
                  : `
            bg-[rgba(0,0,0,0.04)]
            border-[rgba(0,0,0,0.08)]
            text-[#8899aa]
            hover:bg-[#e6394612]
            hover:border-[#e6394638]
            hover:text-[#1a1d2e]
          `
              }
  `}
            onClick={() => handleChip(chip)}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>

  );
}

export default Searchbar;
