import { Clapperboard } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`Navbar ${isDark ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="navbar-inner">
        {/* Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo-icon"><Clapperboard size={24} /></div>
          <div>
            <div className="navbar-title">CineSearch</div>
            <div className="navbar-subtitle">Movies &amp; TV Shows</div>
          </div>
        </div>

        {/* Theme Toggle */}
       <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}
