import React from 'react';

function Loader({ theme }) {
  const isDark = theme === 'dark';
  return (
    <div className={`spinner-wrapper ${isDark ? 'loader-dark' : 'loader-light'}`}>
      <div className="spinner" />
      <span className="spinner-text">Loading…</span>
    </div>
  );
}

export default Loader;