import React, { useRef, useState, useEffect, useCallback } from "react";

// Popular genre/mood quick-search chips
const QUICK_SEARCHES = [
  "Action", "Comedy", "Horror", "Sci-Fi", "Thriller", "Romance", "Drama", "Animation",
];

function Searchbar({ updateParam, cardHidden, setCardHidden, theme }) {
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
          <svg className={`search-icon ${isFocused ? "search-icon-active" : ""}`}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

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

          {/* Live char count */}
          {value.length > 0 && (
            <span className={`search-char-count ${isDark ? "count-dark" : "count-light"}`}>
              {value.length}
            </span>
          )}

          {/* Clear */}
          {value.length > 0 && (
            <button onClick={handleClear} title="Clear (Esc)"
              className={`search-clear-btn ${isDark ? "clear-dark" : "clear-light"}`}
              aria-label="Clear search">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          )}

          {/* Search button */}
          <button
            className="search-submit-btn"
            type="button"
            onClick={() => { clearTimeout(debounceTimer.current); fireSearch(value); }}
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ marginRight: "6px" }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </button>
        </div>

        {/* ── Quick-search chips ── */}
        <div className="search-chips">
          {QUICK_SEARCHES.map((chip) => (
            <button
              key={chip}
              className={`search-chip ${value === chip ? "chip-active" : ""} ${isDark ? "chip-dark" : "chip-light"}`}
              onClick={() => handleChip(chip)}
              type="button"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
