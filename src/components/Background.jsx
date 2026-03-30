import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

const CARD_DEFS = [
  { icon: '🏗️', key: 'career',        type: 'content' },
  { icon: '⚙️', key: 'roles',         type: 'items'   },
  { icon: '🤖', key: 'ai',            type: 'content' },
  { icon: '🔄', key: 'methodologies', type: 'items'   },
  { icon: '🎓', key: 'education',     type: 'content' },
  { icon: '🌐', key: 'global',        type: 'items'   },
];

export default function Background() {
  const { t } = useTranslation();

  return (
    <section id="background">
      <div className="container">
        <SectionHeader label={t('background.label')} title={t('background.title')} />
        <div className="cards-grid">
          {CARD_DEFS.map(({ icon, key, type }) => {
            const base = `background.cards.${key}`;
            return (
              <div className="card" key={key}>
                <div className="card-header">
                  <span className="card-icon">{icon}</span>
                  <h3>{t(`${base}.title`)}</h3>
                </div>
                {type === 'content' && <p>{t(`${base}.content`)}</p>}
                {type === 'items' && (
                  <ul>
                    {(t(`${base}.items`, { returnObjects: true })).map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
