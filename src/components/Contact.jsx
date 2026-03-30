import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

const EMPTY = { name: '', email: '', message: '' };

const INFO = [
  { icon: '📍', value: 'Rosario, Argentina' },
  { icon: '✉️', value: 'guidoalloatti@gmail.com', href: 'mailto:guidoalloatti@gmail.com' },
  { icon: '🐙', value: 'github.com/guidoalloatti',  href: 'https://github.com/guidoalloatti' },
  { icon: '💼', value: 'in/guidoalloatti',           href: 'https://nz.linkedin.com/in/guidoalloatti' },
];

export default function Contact() {
  const { t } = useTranslation();
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: false }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = Object.fromEntries(
      Object.keys(EMPTY).filter(k => !fields[k].trim()).map(k => [k, true])
    );
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const body = `From: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`;
    window.location.href = `mailto:guidoalloatti@gmail.com?subject=Portfolio%20Contact&body=${encodeURIComponent(body)}`;
    setFields(EMPTY);
    setSent(true);
  }

  return (
    <section id="contact">
      <div className="container">
        <SectionHeader label={t('contact.label')} title={t('contact.title')} />
        <div className="contact-grid">

          <div className="contact-info">
            <p className="contact-tagline">{t('contact.tagline')}</p>
            <ul className="contact-info-list">
              {INFO.map(({ icon, value, href }) => (
                <li key={value} className="ci-row">
                  <span className="ci-icon">{icon}</span>
                  {href
                    ? <a href={href} target="_blank" rel="noreferrer" className="ci-value">{value}</a>
                    : <span className="ci-value">{value}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-form-wrap">
            {sent && <div className="form-success">{t('contact.sent')}</div>}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-row">
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.namePlaceholder')}
                  value={fields.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={fields.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              <textarea
                name="message"
                rows="4"
                placeholder={t('contact.messagePlaceholder')}
                value={fields.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
              />
              <button type="submit" className="form-submit">
                <span>{t('contact.send')}</span>
                <span className="form-submit-arrow">→</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
