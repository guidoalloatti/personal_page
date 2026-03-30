import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const SKILL_GROUPS = [
  {
    key: 'languages',
    color: '#22c55e',
    skills: [
      { name: 'Ruby',       level: 10 },
      { name: 'Go',         level: 9  },
      { name: 'JavaScript', level: 9  },
      { name: 'PHP',        level: 8  },
      { name: 'Python',     level: 7  },
      { name: 'TypeScript', level: 6  },
      { name: 'Bash/Shell', level: 5  },
      { name: 'Perl',       level: 3  },
    ],
  },
  {
    key: 'frameworks',
    color: '#3b82f6',
    skills: [
      { name: 'Rails',    level: 10 },
      { name: 'React',    level: 9  },
      { name: 'Node.js',  level: 9  },
      { name: 'GraphQL',  level: 7  },
      { name: 'Next.js',  level: 7  },
      { name: 'Symfony',  level: 6  },
      { name: 'Redux',    level: 6  },
      { name: 'Angular',  level: 4  },
    ],
  },
  {
    key: 'data',
    color: '#f59e0b',
    skills: [
      { name: 'PostgreSQL', level: 9  },
      { name: 'AWS',        level: 9  },
      { name: 'Docker',     level: 8  },
      { name: 'MySQL',      level: 8  },
      { name: 'MongoDB',    level: 7  },
      { name: 'Redis',      level: 7  },
      { name: 'Git',        level: 10 },
      { name: 'Lambda',     level: 7  },
      { name: 'CircleCI',   level: 6  },
    ],
  },
  {
    key: 'ai',
    color: '#ec4899',
    skills: [
      { name: 'Claude / GPT',  level: 10 },
      { name: 'Cursor',        level: 9  },
      { name: 'Copilot',       level: 8  },
      { name: 'LLM APIs',      level: 8  },
      { name: 'Prompt Eng.',   level: 8  },
      { name: 'RAG',           level: 7  },
      { name: 'Automation',    level: 7  },
    ],
  },
];

function SkillGroup({ groupKey, color, skills }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const label = t(`skills.groups.${groupKey}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('[data-w]').forEach((bar, i) => {
            setTimeout(() => { bar.style.width = bar.dataset.w; }, i * 55);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-group" ref={ref}>
      <div className="skill-group-label" style={{ color }}>{label}</div>
      <div className="skill-list">
        {skills.map(({ name, level }) => (
          <div className="skill-row" key={name}>
            <span className="skill-name">{name}</span>
            <div className="skill-track">
              <div
                className="skill-fill"
                data-w={`${level * 10}%`}
                style={{ background: color, width: 0, transition: 'width 0.55s cubic-bezier(0.4,0,0.2,1)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skillset() {
  return (
    <div className="skill-groups">
      {SKILL_GROUPS.map(g => <SkillGroup key={g.key} groupKey={g.key} color={g.color} skills={g.skills} />)}
    </div>
  );
}
