import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import Skillset from './Skillset';

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills">
      <div className="container">
        <SectionHeader label={t('skills.label')} title={t('skills.title')} />
        <Skillset />
      </div>
    </section>
  );
}
