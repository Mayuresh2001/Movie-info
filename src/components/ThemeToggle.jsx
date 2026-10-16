import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <button
          onClick={toggleTheme}
          className={`theme-toggle ${isDark ? 'theme-toggle-dark' : 'theme-toggle-light'}`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          <span className="theme-toggle-track">
            <span className="theme-toggle-thumb">
              {isDark ? <Moon size={16} /> : <Sun size={16} />}
            </span>
          </span>
          <span className="theme-toggle-label">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
  )
}

export default ThemeToggle