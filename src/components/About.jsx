import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about">
      <div className="container">
        <SectionHeader label={t('about.label')} title={t('about.title')} />
        <div className="about-grid">
          <img src="images/person_1.jpg" alt="Guido Alloatti" className="about-photo" />
          <div>
            <div className="about-name">Guido Alloatti</div>
            <div className="about-role">{t('about.role')}</div>
            <p className="about-bio">{t('about.bio1')}</p>
            <p className="about-bio" style={{ marginTop: 0 }}>{t('about.bio2')}</p>
            <span className="about-location">📍 {t('about.location')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
