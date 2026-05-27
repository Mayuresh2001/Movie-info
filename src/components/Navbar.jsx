import React from 'react';

export default function Navbar({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`Navbar ${isDark ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="navbar-inner">
        {/* Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo-icon">🎬</div>
          <div>
            <div className="navbar-title">CineSearch</div>
            <div className="navbar-subtitle">Movies &amp; TV Shows</div>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`theme-toggle ${isDark ? 'theme-toggle-dark' : 'theme-toggle-light'}`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          <span className="theme-toggle-track">
            <span className="theme-toggle-thumb">
              {isDark ? '🌙' : '☀️'}
            </span>
          </span>
          <span className="theme-toggle-label">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
    </div>
  );
}
