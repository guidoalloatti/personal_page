import { useTranslation } from 'react-i18next';

const LINKS = [
  { key: 'GitHub',   href: 'https://github.com/guidoalloatti' },
  { key: 'LinkedIn', href: 'https://nz.linkedin.com/in/guidoalloatti' },
  { key: 'Email',    href: 'mailto:guidoalloatti@gmail.com' },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="footer">
      <div className="footer-glow" />
      <div className="footer-inner">

        <span className="footer-subtitle">
          {t('footer.subtitle')}
        </span>

        <span className="footer-copy">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </span>

        <nav className="footer-links">
          {LINKS.map(({ key, href }) => (
            <a key={key} href={href} target="_blank" rel="noreferrer" className="footer-link">
              {key}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  );
}
