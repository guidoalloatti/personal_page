import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NAV = [
  { key: 'about-me',   anchor: 'about' },
  { key: 'background', anchor: 'background' },
  { key: 'experience', anchor: 'experience' },
  { key: 'skills',     anchor: 'skills' },
  { key: 'contact',    anchor: 'contact' },
  { key: 'visualizer', anchor: 'visualizer' },
];

// All nav keys are looked up as nav.<key> in the locale files

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
  } catch (_) {}
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch (_) {}
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="7.5" cy="7.5" r="2.8" />
      <line x1="7.5" y1="1" x2="7.5" y2="2.5" />
      <line x1="7.5" y1="12.5" x2="7.5" y2="14" />
      <line x1="1" y1="7.5" x2="2.5" y2="7.5" />
      <line x1="12.5" y1="7.5" x2="14" y2="7.5" />
      <line x1="2.93" y1="2.93" x2="3.99" y2="3.99" />
      <line x1="11.01" y1="11.01" x2="12.07" y2="12.07" />
      <line x1="2.93" y1="12.07" x2="3.99" y2="11.01" />
      <line x1="11.01" y1="3.99" x2="12.07" y2="2.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M6.5 1.5A5.5 5.5 0 1 0 12.5 7.5 4 4 0 0 1 6.5 1.5z" />
    </svg>
  );
}

function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" />
          <line x1="18" y1="4" x2="4" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="16" x2="19" y2="16" />
        </>
      )}
    </svg>
  );
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) { const m = Math.floor(diff / 60); return `${m}m ago`; }
  if (diff < 86400) { const h = Math.floor(diff / 3600); return `${h}h ago`; }
  const d = Math.floor(diff / 86400);
  return `${d}d ago`;
}

function BuildTooltip() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(n => n + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const date = new Date(__BUILD_DATE__);
  const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="build-tooltip">
      <div className="build-tooltip-row"><span className="build-tooltip-label">version</span><span>v{__BUILD_VERSION__}</span></div>
      <div className="build-tooltip-row"><span className="build-tooltip-label">commit</span><span>{__BUILD_HASH__}</span></div>
      <div className="build-tooltip-row"><span className="build-tooltip-label">deployed</span><span>{dateStr} {timeStr} <span className="build-ago">({timeAgo(date)})</span></span></div>
    </div>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled]       = useState(false);
  const [progress, setProgress]       = useState(0);
  const [activeSection, setActive]    = useState('');
  const [theme, setTheme]             = useState(getInitialTheme);
  const [menuOpen, setMenuOpen]       = useState(false);

  useEffect(() => { applyTheme(theme); }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    );
    document.querySelectorAll('section[id]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }

  function handleNavClick(anchor) {
    setMenuOpen(false);
    setTimeout(() => scrollTo(anchor), 80);
  }

  return (
    <>
      <div id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="header-progress" style={{ width: `${progress}%` }} />
        <div className="header-inner">
          <button className="header-logo" onClick={() => scrollTo('hero')}>
            Guido<span>.</span>
          </button>

          <nav className="header-nav">
            {NAV.map(({ key, anchor }) => (
              <a
                key={key}
                href={`#${anchor}`}
                className={activeSection === anchor ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(anchor); }}
              >
                {t(`nav.${key}`)}
              </a>
            ))}

            <div className="header-controls">
              <button className="theme-btn" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle theme">
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
              <div className="lang-toggle">
                <button className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`} onClick={() => i18n.changeLanguage('en')}>EN</button>
                <span className="lang-sep">/</span>
                <button className={`lang-btn ${i18n.language === 'es' ? 'active' : ''}`} onClick={() => i18n.changeLanguage('es')}>ES</button>
              </div>
              <div className="build-badge">
                <span className="build-badge-icon" aria-label="Build info">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7" cy="7" r="6" />
                    <line x1="7" y1="6" x2="7" y2="10" />
                    <circle cx="7" cy="4" r="0.5" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <BuildTooltip />
              </div>
            </div>
          </nav>

          {/* Mobile right side: controls + hamburger */}
          <div className="header-mobile-right">
            <button className="theme-btn" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav">
          {NAV.map(({ key, anchor }) => (
            <a
              key={key}
              href={`#${anchor}`}
              className={activeSection === anchor ? 'active' : ''}
              onClick={e => { e.preventDefault(); handleNavClick(anchor); }}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <div className="mobile-lang">
            <button className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`} onClick={() => i18n.changeLanguage('en')}>EN</button>
            <span className="lang-sep">/</span>
            <button className={`lang-btn ${i18n.language === 'es' ? 'active' : ''}`} onClick={() => i18n.changeLanguage('es')}>ES</button>
          </div>
        </nav>
      </div>
    </>
  );
}
