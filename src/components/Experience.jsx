import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

const JOB_META = [
  {
    key: 'flowspace',
    company: 'Flowspace',
    url: 'https://www.flowspace.com',
    logo: '',
    role: 'Senior Software Engineer',
    date: 'Sep 2021 – Present',
    duration: '3+ yrs · Contract · Remote',
    tech: ['Ruby on Rails', 'React', 'GraphQL', 'PostgreSQL', 'Jest', 'Cypress', 'Docker'],
    defaultOpen: true,
  },
  {
    key: 'ring-amazon',
    company: 'Amazon · Ring',
    url: 'https://ring.com',
    logo: '',
    role: 'Senior Consultant',
    date: 'Oct 2018 – Sep 2021',
    duration: '3 yrs · Remote',
    tech: ['React', 'Redux', 'Ruby', 'Rails', 'Golang', 'PostgreSQL', 'DynamoDB', 'CDK', 'Lambda', 'Docker'],
  },
  {
    key: 'ring',
    company: 'Ring',
    url: 'https://ring.com',
    logo: '',
    role: 'Senior Software Engineer',
    date: 'Apr 2016 – Sep 2020',
    duration: '4 yrs 6 mos · Rosario / Santa Monica',
    tech: ['Ruby', 'Rails', 'Go', 'Node.js', 'React', 'Redux', 'PostgreSQL', 'PostGIS', 'AWS', 'Jest'],
  },
  {
    key: 'mobomo',
    company: 'Mobomo',
    url: 'https://mobomo.com',
    logo: '',
    role: 'Team Lead & Senior Software Developer',
    date: 'Mar 2016 – Dec 2017',
    duration: '1 yr 10 mos · Rosario, ARG',
    tech: ['Ruby on Rails', 'PHP', 'GraphQL', 'Angular 2', 'MySQL', 'CircleCI', 'AWS'],
  },
];

const MORE_JOB_META = [
  {
    key: 'kathmandu',
    company: 'Kathmandu',
    url: 'http://www.kathmandu.co.nz',
    logo: 'images/kathmandu.jpg',
    role: 'Technical Team Lead & Senior Web Developer',
    date: '2015',
    duration: 'Christchurch, NZ',
    tech: ['PHP', 'Magento', 'MySQL', 'Git', 'Scrum'],
  },
  {
    key: 'velocity',
    company: 'Velocity Partners',
    url: 'http://www.velocitypartners.net',
    logo: 'images/velocity.jpg',
    role: 'Senior Web Developer → Team Lead & Solutions Manager',
    date: 'Nov 2009 – Mar 2015',
    duration: '5 yrs 4 mos · Rosario, ARG',
    tech: ['PHP', 'Ruby', 'Rails', 'Perl', 'CakePHP', 'SugarCRM', 'MySQL', 'Scrum'],
  },
  {
    key: 'accenture',
    company: 'Accenture',
    url: 'https://www.accenture.com/',
    logo: 'images/accenture.jpg',
    role: 'Senior Web Developer & Architect',
    date: 'Feb 2009 – Nov 2009',
    duration: 'Rosario, ARG',
    tech: ['PHP', 'Java', 'SQL'],
  },
  {
    key: 'latinux',
    company: 'Latinux Sistemas',
    url: '#',
    logo: 'images/latinux.jpg',
    role: 'Developer',
    date: 'Feb 2005 – Nov 2009',
    duration: 'Rosario, ARG',
    tech: ['C', 'PHP', 'Python', 'Perl', 'C#'],
  },
  {
    key: 'elepe',
    company: 'Elepe Servicios',
    url: 'http://www.elepeservicios.com.ar/',
    logo: 'images/elepe.jpg',
    role: 'Junior Developer',
    date: 'Apr 2004 – Feb 2005',
    duration: 'Rosario, ARG',
    tech: ['AS/400', 'Cool Plex'],
  },
];

function JobLogo({ logo, company }) {
  if (logo) return <img src={logo} alt={company} className="timeline-logo" />;
  return <div className="timeline-logo timeline-logo-initial">{company.charAt(0)}</div>;
}

function Job({ jobKey, company, url, logo, role, date, duration, tech, defaultOpen }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(defaultOpen ?? false);
  const items = t(`experience.jobs.${jobKey}.items`, { returnObjects: true });

  return (
    <div className={`timeline-item${open ? ' open' : ''}`}>
      <button className="timeline-header" onClick={() => setOpen(v => !v)}>
        <JobLogo logo={logo} company={company} />
        <div className="timeline-meta">
          <a href={url} target="_blank" rel="noreferrer" className="timeline-company" onClick={e => e.stopPropagation()}>
            {company}
          </a>
          <div className="timeline-role">{role}</div>
        </div>
        <div className="timeline-right">
          <div className="timeline-date">{date}</div>
          <div className="timeline-duration">{duration}</div>
        </div>
        <span className="timeline-chevron" aria-hidden>{open ? '−' : '+'}</span>
      </button>
      <div className="timeline-body-wrap">
        <div className="timeline-body-inner">
          <ul className="timeline-body">
            {Array.isArray(items) && items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          {tech?.length > 0 && (
            <div className="timeline-tech">
              {tech.map(tag => <span key={tag} className="tech-tag">{tag}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="experience">
      <div className="container">
        <SectionHeader label={t('experience.label')} title={t('experience.title')} />
        <div className="timeline">
          {JOB_META.map(job => <Job key={job.key} jobKey={job.key} {...job} />)}
          {showMore && MORE_JOB_META.map(job => <Job key={job.key} jobKey={job.key} {...job} />)}
        </div>
        <button className="show-more-btn" onClick={() => setShowMore(v => !v)}>
          {showMore ? t('experience.showLess') : t('experience.showMore')}
        </button>
      </div>
    </section>
  );
}
